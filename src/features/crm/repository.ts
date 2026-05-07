import {
  LeadStatus,
  SiteVisitStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getAssignableUsers() {
  const [salesUsers, engineerUsers] = await Promise.all([
    prisma.user.findMany({
      where: {
        status: "ACTIVE",
        role: {
          name: {
            in: ["SUPER_ADMIN", "SALES_MANAGER"],
          },
        },
      },
      orderBy: [{ firstName: "asc" }],
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.user.findMany({
      where: {
        status: "ACTIVE",
        role: {
          name: {
            in: ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
          },
        },
      },
      orderBy: [{ firstName: "asc" }],
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    }),
  ]);

  return {
    salesUsers,
    engineerUsers,
  };
}

export async function getDashboardOverview() {
  const now = new Date();

  const [
    totalLeads,
    newLeads,
    contactedLeads,
    qualifiedLeads,
    wonLeads,
    lostLeads,
    totalCustomers,
    siteVisitsScheduled,
    recentLeads,
    upcomingSiteVisits,
    leadStatuses,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: LeadStatus.NEW } }),
    prisma.lead.count({ where: { status: LeadStatus.CONTACTED } }),
    prisma.lead.count({ where: { status: LeadStatus.QUALIFIED } }),
    prisma.lead.count({ where: { status: LeadStatus.WON } }),
    prisma.lead.count({ where: { status: LeadStatus.LOST } }),
    prisma.customer.count(),
    prisma.siteVisit.count({
      where: {
        status: {
          in: [SiteVisitStatus.SCHEDULED, SiteVisitStatus.ASSIGNED, SiteVisitStatus.RESCHEDULED],
        },
      },
    }),
    prisma.lead.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: 6,
      select: {
        id: true,
        leadNumber: true,
        name: true,
        phone: true,
        serviceInterest: true,
        status: true,
        priority: true,
        createdAt: true,
      },
    }),
    prisma.siteVisit.findMany({
      where: {
        scheduledAt: { gte: now },
        status: {
          in: [SiteVisitStatus.SCHEDULED, SiteVisitStatus.ASSIGNED, SiteVisitStatus.RESCHEDULED],
        },
      },
      orderBy: [{ scheduledAt: "asc" }],
      take: 5,
      select: {
        id: true,
        visitNumber: true,
        scheduledAt: true,
        address: true,
        status: true,
        serviceInterest: true,
        lead: {
          select: {
            name: true,
          },
        },
        customer: {
          select: {
            legalName: true,
          },
        },
      },
    }),
    prisma.lead.findMany({
      select: {
        status: true,
      },
    }),
  ]);

  const statusSummaryMap = new Map<string, number>();

  for (const lead of leadStatuses) {
    statusSummaryMap.set(lead.status, (statusSummaryMap.get(lead.status) ?? 0) + 1);
  }

  const funnel = [
    { label: "New", value: newLeads },
    { label: "Contacted", value: contactedLeads },
    { label: "Qualified", value: qualifiedLeads },
    { label: "Won", value: wonLeads },
  ];

  return {
    metrics: {
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      siteVisitsScheduled,
      wonLeads,
      lostLeads,
      totalCustomers,
    },
    recentLeads,
    upcomingSiteVisits,
    statusSummary: Array.from(statusSummaryMap.entries()).map(([status, count]) => ({
      status,
      count,
    })),
    funnel,
  };
}

export async function getCrmServices() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ name: "asc" }],
    select: {
      id: true,
      name: true,
      code: true,
    },
  });

  return services;
}
