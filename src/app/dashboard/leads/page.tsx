import { Card, CardContent } from "@/components/ui/card";
import { LeadTable } from "@/features/leads/components/lead-table";
import { getLeadsForDashboard } from "@/features/leads/repository";

export const dynamic = "force-dynamic";

const numberFormatter = new Intl.NumberFormat("en-IN");

export default async function DashboardLeadsPage() {
  const leads = await getLeadsForDashboard();
  const newLeadsCount = leads.filter((lead) => lead.status === "NEW").length;
  const hotLeadsCount = leads.filter(
    (lead) => lead.priority === "HIGH" || lead.priority === "URGENT",
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-amber-200/80">
            CRM
          </div>
          <h1 className="mt-3 font-heading text-4xl text-white">Lead Pipeline</h1>
          <p className="mt-2 max-w-2xl text-zinc-400">
            Website enquiries, quote requests, site visits, and service CTAs land here with source attribution and activity history.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Total leads" value={numberFormatter.format(leads.length)} />
        <MetricCard label="New enquiries" value={numberFormatter.format(newLeadsCount)} />
        <MetricCard label="High-priority" value={numberFormatter.format(hotLeadsCount)} />
      </div>

      {leads.length > 0 ? (
        <LeadTable leads={leads} />
      ) : (
        <Card className="border border-white/10 bg-[#101113]/92 py-0 shadow-none">
          <CardContent className="p-10 text-center text-zinc-400">
            No leads yet. Public website submissions will start appearing here once they are received.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border border-white/10 bg-[#101113]/92 py-0 shadow-none">
      <CardContent className="p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</div>
        <div className="mt-4 font-heading text-4xl text-white">{value}</div>
      </CardContent>
    </Card>
  );
}
