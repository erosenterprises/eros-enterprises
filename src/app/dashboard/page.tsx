import Link from "next/link";
import {
  Calendar,
  FileText,
  MessageSquare,
  Receipt,
  Users,
} from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getBillingDashboardMetrics, getInvoices } from "@/features/billing/repository";
import { getDashboardOverview } from "@/features/crm/repository";
import { formatCurrency, getInitials } from "@/features/crm/utils";

export const dynamic = "force-dynamic";

function timeAgo(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getLeadStatusStyle(status: string): { bg: string; color: string } {
  switch (status) {
    case "NEW": return { bg: "rgba(245,166,35,0.15)", color: "#F5A623" };
    case "CONTACTED": return { bg: "rgba(21,101,192,0.15)", color: "#64B5F6" };
    case "QUALIFIED": return { bg: "rgba(156,39,176,0.15)", color: "#CE93D8" };
    case "SITE_VISIT_SCHEDULED": return { bg: "rgba(0,150,136,0.15)", color: "#4DB6AC" };
    case "QUOTATION_SENT": return { bg: "rgba(33,150,243,0.15)", color: "#90CAF9" };
    case "WON": return { bg: "rgba(76,175,80,0.15)", color: "#4CAF50" };
    case "LOST": return { bg: "rgba(239,83,80,0.15)", color: "#EF5350" };
    default: return { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" };
  }
}

function getLeadStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    NEW: "New", CONTACTED: "Contacted", QUALIFIED: "Qualified",
    SITE_VISIT_SCHEDULED: "Site Visit", QUOTATION_SENT: "Quoted",
    WON: "Won", LOST: "Lost",
  };
  return labels[status] ?? status;
}

const FALLBACK_OVERVIEW = {
  metrics: {
    totalLeads: 0, newLeads: 0, contactedLeads: 0, qualifiedLeads: 0,
    siteVisitsScheduled: 0, wonLeads: 0, lostLeads: 0, totalCustomers: 0,
    activeProjects: 0, completedProjects: 0, delayedOrOnHoldProjects: 0,
    dueSoonAmcCount: 0, expiredAmcCount: 0,
  },
  recentLeads: [] as Array<{
    id: string; leadNumber: string; name: string; phone: string;
    serviceInterest: string | null; status: string; priority: string; createdAt: Date;
  }>,
  upcomingSiteVisits: [] as Array<{
    id: string; visitNumber: string; scheduledAt: Date; address: string | null;
    status: string; serviceInterest: string | null;
    lead: { name: string } | null; customer: { legalName: string } | null;
  }>,
  upcomingRenewals: [] as unknown[],
  statusSummary: [] as unknown[],
  funnel: [
    { label: "New", value: 0 }, { label: "Contacted", value: 0 },
    { label: "Qualified", value: 0 }, { label: "Won", value: 0 },
  ],
};

const FALLBACK_BILLING = { quotedValue: 0, invoicedValue: 0, collectedAmount: 0, pendingAmount: 0 };

export default async function DashboardPage() {
  let overview = FALLBACK_OVERVIEW;
  let billingMetrics = FALLBACK_BILLING;
  let invoices: Awaited<ReturnType<typeof getInvoices>> = [];

  try {
    [overview, billingMetrics, invoices] = await Promise.all([
      getDashboardOverview(),
      getBillingDashboardMetrics(),
      getInvoices({}),
    ]);
  } catch (err) {
    console.error("[dashboard] Data fetch failed — showing empty state:", err);
  }

  const openInvoiceCount = invoices.filter(
    (inv: { effectiveStatus: string }) => inv.effectiveStatus === "SENT" || inv.effectiveStatus === "PARTIALLY_PAID",
  ).length;

  const m = overview.metrics;

  const kpis = [
    { label: "Total leads", value: m.totalLeads.toString(), delta: m.totalLeads === 0 ? "Ready to start" : `${m.newLeads} new` },
    { label: "Customers", value: m.totalCustomers.toString(), delta: "Active accounts" },
    { label: "Revenue collected", value: formatCurrency(billingMetrics.collectedAmount), delta: `${formatCurrency(billingMetrics.pendingAmount)} pending` },
    { label: "Open invoices", value: openInvoiceCount.toString(), delta: "Awaiting payment" },
    { label: "Site visits", value: m.siteVisitsScheduled.toString(), delta: "Upcoming" },
    { label: "AMC renewals", value: m.dueSoonAmcCount.toString(), delta: "Due soon" },
  ];

  const navCards = [
    { href: "/dashboard/leads", icon: <Users className="w-5 h-5" />, label: "Leads", desc: "Pipeline & CRM" },
    { href: "/dashboard/quotations", icon: <FileText className="w-5 h-5" />, label: "Quotations", desc: "Create & send" },
    { href: "/dashboard/invoices", icon: <Receipt className="w-5 h-5" />, label: "Invoices", desc: "Billing & payments" },
    { href: "/dashboard/site-visits", icon: <Calendar className="w-5 h-5" />, label: "Site Visits", desc: "Schedule & track" },
    { href: "/dashboard/whatsapp", icon: <MessageSquare className="w-5 h-5" />, label: "WhatsApp", desc: "Inbox & replies" },
    { href: "/dashboard/analytics", icon: <Receipt className="w-5 h-5" />, label: "Analytics", desc: "Reports & charts" },
  ];

  return (
    <DashboardShell title="Dashboard" subtitle="Eros Enterprises CRM">
      <div className="px-4 py-5 space-y-6">

        {/* KPI grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-[12px] p-4"
                 style={{ background: "#0F1F3D", border: "1px solid rgba(21,101,192,0.22)" }}>
              <div className="text-[10px] uppercase tracking-[0.08em] mb-1"
                   style={{ color: "rgba(255,255,255,0.35)" }}>{kpi.label}</div>
              <div className="font-bold text-[22px] text-white mb-1">{kpi.value}</div>
              <div className="text-[11px]" style={{ color: "#8896AA" }}>{kpi.delta}</div>
            </div>
          ))}
        </div>

        {/* Nav cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {navCards.map((card) => (
            <Link key={card.href} href={card.href}
                  className="rounded-[12px] p-4 flex items-center gap-3 transition-all hover:border-[#1565C0]"
                  style={{ background: "#0F1F3D", border: "1px solid rgba(21,101,192,0.22)" }}>
              <div className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                   style={{ background: "rgba(21,101,192,0.15)", color: "#93C5FD" }}>
                {card.icon}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">{card.label}</div>
                <div className="text-[11px]" style={{ color: "#8896AA" }}>{card.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent leads */}
        {overview.recentLeads.length > 0 && (
          <div className="rounded-[12px] overflow-hidden"
               style={{ background: "#0F1F3D", border: "1px solid rgba(21,101,192,0.22)" }}>
            <div className="px-4 py-3 flex items-center justify-between"
                 style={{ borderBottom: "1px solid rgba(21,101,192,0.15)" }}>
              <span className="text-[12px] font-semibold text-white">Recent Leads</span>
              <Link href="/dashboard/leads"
                    className="text-[11px]" style={{ color: "#93C5FD" }}>View all →</Link>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(21,101,192,0.1)" }}>
              {overview.recentLeads.map((lead) => {
                const style = getLeadStatusStyle(lead.status);
                return (
                  <Link key={lead.id} href={`/dashboard/leads/${lead.id}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                         style={{ background: "rgba(21,101,192,0.2)", color: "#93C5FD" }}>
                      {getInitials(lead.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-white truncate">{lead.name}</div>
                      <div className="text-[10px] truncate" style={{ color: "#8896AA" }}>
                        {lead.serviceInterest ?? "General enquiry"} · {timeAgo(new Date(lead.createdAt))}
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: style.bg, color: style.color }}>
                      {getLeadStatusLabel(lead.status)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming site visits */}
        {overview.upcomingSiteVisits.length > 0 && (
          <div className="rounded-[12px] overflow-hidden"
               style={{ background: "#0F1F3D", border: "1px solid rgba(21,101,192,0.22)" }}>
            <div className="px-4 py-3 flex items-center justify-between"
                 style={{ borderBottom: "1px solid rgba(21,101,192,0.15)" }}>
              <span className="text-[12px] font-semibold text-white">Upcoming Site Visits</span>
              <Link href="/dashboard/site-visits"
                    className="text-[11px]" style={{ color: "#93C5FD" }}>View all →</Link>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(21,101,192,0.1)" }}>
              {overview.upcomingSiteVisits.map((visit) => (
                <div key={visit.id} className="px-4 py-3">
                  <div className="text-[12px] font-semibold text-white">
                    {visit.lead?.name ?? visit.customer?.legalName ?? "Client"}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#8896AA" }}>
                    {new Date(visit.scheduledAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
                    })}
                    {visit.address ? ` · ${visit.address}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
