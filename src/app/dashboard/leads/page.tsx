import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import leadRepository from "@/features/leads/repository";
import { getDashboardOverview } from "@/features/crm/repository";
import { getInitials } from "@/features/crm/utils";
import { dateTimeFormatter } from "@/features/crm/utils";

export const dynamic = "force-dynamic";

function getStringParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

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
    NEW: "New",
    CONTACTED: "Contacted",
    QUALIFIED: "Qualified",
    SITE_VISIT_SCHEDULED: "Site Visit",
    QUOTATION_SENT: "Quoted",
    WON: "Won",
    LOST: "Lost",
  };
  return labels[status] ?? status;
}

const PILL_FILTERS = [
  { label: "All", value: "" },
  { label: "New", value: "NEW" },
  { label: "Contacted", value: "CONTACTED" },
  { label: "Site Visit", value: "SITE_VISIT_SCHEDULED" },
  { label: "Won", value: "WON" },
] as const;

export default async function DashboardLeadsPage(
  props: PageProps<"/dashboard/leads">,
) {
  const searchParams = await props.searchParams;
  const status = getStringParam(searchParams.status);

  const [leads, overview] = await Promise.all([
    leadRepository.getLeadsForDashboard({ status }),
    getDashboardOverview(),
  ]);

  const filterIcon = (
    <Link
      href="/dashboard/leads"
      className="flex h-8 w-8 items-center justify-center rounded-full"
      style={{ background: "rgba(255,255,255,0.06)" }}
      aria-label="Clear filters"
    >
      <SlidersHorizontal size={15} color="rgba(255,255,255,0.65)" />
    </Link>
  );

  return (
    <DashboardShell
      title="Lead pipeline"
      subtitle={`${leads.length} lead${leads.length !== 1 ? "s" : ""}`}
      actions={filterIcon}
    >
      <div className="space-y-5 px-4 py-4">

        {/* Horizontal pill filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {PILL_FILTERS.map((pill) => {
            const active = (pill.value === "" && !status) || pill.value === status;
            const href = pill.value
              ? `/dashboard/leads?status=${pill.value}`
              : "/dashboard/leads";
            return (
              <Link
                key={pill.value}
                href={href}
                className="shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                style={{
                  fontSize: "12px",
                  fontWeight: active ? 600 : 400,
                  background: active ? "#F5A623" : "rgba(255,255,255,0.07)",
                  color: active ? "#050A14" : "rgba(255,255,255,0.55)",
                  border: active ? "none" : "1px solid rgba(255,255,255,0.08)",
                  whiteSpace: "nowrap",
                }}
              >
                {pill.label}
              </Link>
            );
          })}
        </div>

        {/* Lead list */}
        {leads.length > 0 ? (
          <div className="space-y-2">
            {leads.map((lead) => {
              const statusStyle = getLeadStatusStyle(lead.status);
              const isHot = lead.priority === "HIGH" || lead.priority === "URGENT";
              const initials = getInitials(lead.name);

              return (
                <Link
                  key={lead.id}
                  href={`/dashboard/leads/${lead.id}`}
                  className="flex items-center gap-3 rounded-[10px] px-3 py-3 transition-opacity active:opacity-70"
                  style={{
                    background: "#0F1F3D",
                    border: "0.5px solid rgba(255,255,255,0.07)",
                    borderLeft: `2.5px solid ${isHot ? "#EF5350" : "#1565C0"}`,
                  }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: "rgba(21,101,192,0.25)", color: "#90CAF9" }}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="truncate font-medium"
                      style={{ fontSize: "13px", color: "#FFFFFF" }}
                    >
                      {lead.name}
                    </div>
                    <div
                      className="truncate"
                      style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}
                    >
                      {lead.serviceInterest}
                    </div>
                    <div
                      style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", marginTop: "1px" }}
                    >
                      {timeAgo(new Date(lead.createdAt))}
                    </div>
                  </div>
                  <div
                    className="shrink-0 rounded-full px-2 py-1 text-center"
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      background: statusStyle.bg,
                      color: statusStyle.color,
                    }}
                  >
                    {getLeadStatusLabel(lead.status)}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div
            className="rounded-[10px] p-8 text-center"
            style={{
              border: "1px dashed rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
              {status ? `No ${getLeadStatusLabel(status).toLowerCase()} leads` : "No leads yet"}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "4px" }}>
              New enquiries will appear here automatically
            </div>
          </div>
        )}

        {/* Upcoming site visits sub-section */}
        {overview.upcomingSiteVisits.length > 0 && (
          <div>
            <div
              className="mb-3 uppercase tracking-[0.06em]"
              style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}
            >
              Upcoming site visits
            </div>
            <div className="space-y-2">
              {overview.upcomingSiteVisits.map((visit) => (
                <Link
                  key={visit.id}
                  href={`/dashboard/site-visits/${visit.id}`}
                  className="flex items-center gap-3 rounded-[10px] px-3 py-3 transition-opacity active:opacity-70"
                  style={{
                    background: "#0F1F3D",
                    border: "0.5px solid rgba(255,255,255,0.07)",
                    borderLeft: "2.5px solid #4DB6AC",
                  }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(0,150,136,0.2)", color: "#4DB6AC" }}
                  >
                    <span style={{ fontSize: "10px", fontWeight: 700 }}>SV</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="truncate font-medium"
                      style={{ fontSize: "13px", color: "#FFFFFF" }}
                    >
                      {visit.customer?.legalName ?? visit.lead?.name ?? "Unlinked visit"}
                    </div>
                    <div
                      className="truncate"
                      style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}
                    >
                      {dateTimeFormatter.format(visit.scheduledAt)}
                    </div>
                    {visit.address && (
                      <div
                        className="truncate"
                        style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", marginTop: "1px" }}
                      >
                        {visit.address}
                      </div>
                    )}
                  </div>
                  <div
                    className="shrink-0 rounded-full px-2 py-1"
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      background: "rgba(0,150,136,0.15)",
                      color: "#4DB6AC",
                    }}
                  >
                    {visit.status.charAt(0) + visit.status.slice(1).toLowerCase()}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </DashboardShell>
  );
}
