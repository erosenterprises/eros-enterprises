import { ActivityEntityType, LeadPriority, LeadSource, LeadStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { LeadCreateInput } from "@/features/leads/schemas";
import type { LeadDetailRecord, LeadListItem } from "@/features/leads/types";
import { createLeadNumberSeed, isUniqueConstraintError } from "@/features/leads/utils";

async function createUniqueLeadNumber() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = createLeadNumberSeed();
    const existingLead = await prisma.lead.findUnique({
      where: { leadNumber: candidate },
      select: { id: true },
    });

    if (!existingLead) {
      return candidate;
    }
  }

  throw new Error("Could not generate a unique lead number.");
}

export async function createLead(input: LeadCreateInput) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const leadNumber = await createUniqueLeadNumber();

    try {
      return await prisma.$transaction(async (tx) => {
        const lead = await tx.lead.create({
          data: {
            leadNumber,
            name: input.name,
            phone: input.phone,
            email: input.email,
            serviceInterest: input.serviceInterest,
            source: input.source as LeadSource,
            sourcePage: input.sourcePage,
            ctaLocation: input.ctaLocation,
            utmSource: input.utmSource,
            utmMedium: input.utmMedium,
            utmCampaign: input.utmCampaign,
            message: input.message,
            location: input.location,
            budgetRange: input.budgetRange,
            status: input.status as LeadStatus,
            priority: input.priority as LeadPriority,
            assignedToId: input.assignedToId,
          },
        });

        await tx.activityLog.create({
          data: {
            action: "LEAD_CREATED",
            description: `Lead ${lead.leadNumber} created from ${lead.sourcePage}.`,
            entityType: ActivityEntityType.LEAD,
            entityId: lead.id,
            leadId: lead.id,
            metadata: {
              serviceInterest: lead.serviceInterest,
              source: lead.source,
              sourcePage: lead.sourcePage,
              ctaLocation: lead.ctaLocation,
              budgetRange: lead.budgetRange,
            },
          },
        });

        return lead;
      });
    } catch (error) {
      if (isUniqueConstraintError(error, "leadNumber")) {
        continue;
      }

      throw error;
    }
  }

  throw new Error("Could not create lead after multiple attempts.");
}

export async function getLeadsForDashboard(): Promise<LeadListItem[]> {
  return prisma.lead.findMany({
    orderBy: [{ createdAt: "desc" }],
    select: {
      id: true,
      leadNumber: true,
      name: true,
      phone: true,
      email: true,
      serviceInterest: true,
      source: true,
      sourcePage: true,
      ctaLocation: true,
      location: true,
      budgetRange: true,
      status: true,
      priority: true,
      createdAt: true,
    },
  });
}

export async function getLeadDetail(leadId: string): Promise<LeadDetailRecord | null> {
  return prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      assignedTo: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      activities: {
        orderBy: { occurredAt: "desc" },
        select: {
          id: true,
          action: true,
          description: true,
          occurredAt: true,
        },
      },
    },
  });
}
