import Link from "next/link";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  getBillingDashboardMetrics,
  getInvoices,
  getPayments,
  getQuotations,
} from "@/features/billing/repository";
import { formatCurrency, shortDateFormatter } from "@/features/crm/utils";

export const dynamic = "force-dynamic";

function getQuotationStatusStyle(status: string): { bg: string; color: string } {
  switch (status) {
    case "DRAFT": return { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" };
    case "SENT": return { bg: "rgba(21,101,192,0.15)", color: "#64B5F6" };
    case "VIEWED": return { bg: "rgba(21,101,192,0.12)", color: "#90CAF9" };
    case "ACCEPTED": return { bg: "rgba(76,175,80,0.15)", color: "#4CAF50" };
    case "REJECTED": return { bg: "rgba(239,83,80,0.15)", color: "#EF5350" };
    case "EXPIRED": return { bg: "rgba(255,152,0,0.15)", color: "#FFA726" };
    default: return { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" };
  }
}

function getInvoiceStatusStyle(status: string): { bg: string; color: string } {
  switch (status) {
    case "DRAFT": return { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" };
    case "SENT": return { bg: "rgba(21,101,192,0.15)", color: "#64B5F6" };
    case "PARTIALLY_PAID": return { bg: "rgba(156,39,176,0.15)", color: "#CE93D8" };
    case "PAID": return { bg: "rgba(76,175,80,0.15)", color: "#4CAF50" };
    case "OVERDUE": return { bg: "rgba(239,83,80,0.15)", color: "#EF5350" };
    case "CANCELLED": return { bg: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" };
    default: return { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" };
  }
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    DRAFT: "Draft", SENT: "Sent", VIEWED: "Viewed", ACCEPTED: "Accepted",
    REJECTED: "Rejected", EXPIRED: "Expired",
    PARTIALLY_PAID: "Part paid", PAID: "Paid", OVERDUE: "Overdue", CANCELLED: "Cancelled",
  };
  return map[status] ?? status;
}

export default async function DashboardBillingPage() {
  const [metrics, quotations, invoices, payments] = await Promise.all([
    getBillingDashboardMetrics(),
    getQuotations({}),
    getInvoices({}),
    getPayments(),
  ]);

  const overdueCount = invoices.filter((inv) => inv.effectiveStatus === "OVERDUE").length;
  const recentQuotations = quotations.slice(0, 5);
  const recentInvoices = invoices.slice(0, 5);

  return (
    <DashboardShell title="Billing">
      <div className="space-y-5 px-4 py-4">

        {/* KPI row — 3 cols */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Quoted", value: formatCurrency(metrics.quotedValue) },
            { label: "Collected", value: formatCurrency(metrics.collectedAmount) },
            { label: "Overdue", value: overdueCount.toString(), accent: overdueCount > 0 },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-[10px] p-3"
              style={{
                background: "#0F1F3D",
                border: "0.5px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: kpi.accent ? "#EF5350" : "#F5A623",
                  lineHeight: 1.2,
                  wordBreak: "break-all",
                }}
              >
                {kpi.value}
              </div>
              <div
                className="mt-1 uppercase tracking-[0.04em]"
                style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)" }}
              >
                {kpi.label}
              </div>
            </div>
          ))}
        </div>

        {/* Count pills */}
        <div className="flex gap-2">
          {[
            { label: "Quotations", count: quotations.length, href: "/dashboard/quotations" },
            { label: "Invoices", count: invoices.length, href: "/dashboard/invoices" },
            { label: "Payments", count: payments.length, href: "/dashboard/payments" },
          ].map((pill) => (
            <Link
              key={pill.label}
              href={pill.href}
              className="flex flex-1 flex-col items-center rounded-[10px] py-2.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF" }}>
                {pill.count}
              </span>
              <span
                style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}
              >
                {pill.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Recent quotations */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div
              className="uppercase tracking-[0.06em]"
              style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}
            >
              Recent quotations
            </div>
            <Link href="/dashboard/quotations" style={{ fontSize: "11px", color: "#F5A623" }}>
              See all
            </Link>
          </div>

          {recentQuotations.length > 0 ? (
            <div className="space-y-2">
              {recentQuotations.map((q) => {
                const style = getQuotationStatusStyle(q.effectiveStatus);
                return (
                  <Link
                    key={q.id}
                    href={`/dashboard/quotations/${q.id}`}
                    className="flex items-center gap-3 rounded-[10px] px-3 py-3 transition-opacity active:opacity-70"
                    style={{
                      background: "#0F1F3D",
                      border: "0.5px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          style={{ fontSize: "10px", color: "#F5A623", fontWeight: 600 }}
                        >
                          {q.quotationNumber}
                        </span>
                        <div
                          className="rounded-full px-2 py-0.5"
                          style={{
                            fontSize: "9px",
                            fontWeight: 600,
                            background: style.bg,
                            color: style.color,
                          }}
                        >
                          {statusLabel(q.effectiveStatus)}
                        </div>
                      </div>
                      <div
                        className="mt-0.5 truncate"
                        style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF" }}
                      >
                        {q.title || (q.customer?.legalName ?? q.lead?.name ?? "Quotation")}
                      </div>
                      <div
                        style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}
                      >
                        {shortDateFormatter.format(q.issueDate)}
                      </div>
                    </div>
                    <div
                      style={{ fontSize: "13px", fontWeight: 700, color: "#F5A623", flexShrink: 0 }}
                    >
                      {formatCurrency(q.totalAmount)}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div
              className="rounded-[10px] p-6 text-center"
              style={{
                border: "1px dashed rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
                No quotations yet
              </div>
            </div>
          )}
        </div>

        {/* Recent invoices */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div
              className="uppercase tracking-[0.06em]"
              style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}
            >
              Recent invoices
            </div>
            <Link href="/dashboard/invoices" style={{ fontSize: "11px", color: "#F5A623" }}>
              See all
            </Link>
          </div>

          {recentInvoices.length > 0 ? (
            <div className="space-y-2">
              {recentInvoices.map((inv) => {
                const style = getInvoiceStatusStyle(inv.effectiveStatus);
                return (
                  <Link
                    key={inv.id}
                    href={`/dashboard/invoices/${inv.id}`}
                    className="flex items-center gap-3 rounded-[10px] px-3 py-3 transition-opacity active:opacity-70"
                    style={{
                      background: "#0F1F3D",
                      border: "0.5px solid rgba(255,255,255,0.07)",
                      borderLeft: inv.effectiveStatus === "OVERDUE"
                        ? "2.5px solid #EF5350"
                        : "0.5px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          style={{ fontSize: "10px", color: "#90CAF9", fontWeight: 600 }}
                        >
                          {inv.invoiceNumber}
                        </span>
                        <div
                          className="rounded-full px-2 py-0.5"
                          style={{
                            fontSize: "9px",
                            fontWeight: 600,
                            background: style.bg,
                            color: style.color,
                          }}
                        >
                          {statusLabel(inv.effectiveStatus)}
                        </div>
                      </div>
                      <div
                        className="mt-0.5 truncate"
                        style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF" }}
                      >
                        {inv.customer?.legalName ?? inv.lead?.name ?? "Invoice"}
                      </div>
                      <div
                        style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}
                      >
                        {inv.dueDate
                          ? `Due ${shortDateFormatter.format(inv.dueDate)}`
                          : shortDateFormatter.format(inv.issueDate)}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>
                        {formatCurrency(inv.totalAmount)}
                      </div>
                      {inv.balanceAmount > 0 && (
                        <div style={{ fontSize: "10px", color: "#EF5350", marginTop: "1px" }}>
                          {formatCurrency(inv.balanceAmount)} due
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div
              className="rounded-[10px] p-6 text-center"
              style={{
                border: "1px dashed rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
                No invoices yet
              </div>
            </div>
          )}
        </div>

      </div>
    </DashboardShell>
  );
}
