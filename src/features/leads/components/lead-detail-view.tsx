import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LeadPriorityBadge,
  LeadStatusBadge,
} from "@/features/leads/components/lead-status-badge";
import { LEAD_SOURCE_LABELS } from "@/features/leads/constants";
import type { LeadDetailRecord } from "@/features/leads/types";
import { formatLeadAssigneeName } from "@/features/leads/utils";

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function LeadDetailView({ lead }: { lead: LeadDetailRecord }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/dashboard/leads"
            className="text-xs uppercase tracking-[0.2em] text-zinc-500 transition hover:text-zinc-300"
          >
            Back to leads
          </Link>
          <h1 className="mt-3 font-heading text-4xl text-white">{lead.name}</h1>
          <p className="mt-2 text-zinc-400">
            {lead.leadNumber} • {lead.serviceInterest}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <LeadStatusBadge status={lead.status} />
          <LeadPriorityBadge priority={lead.priority} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border border-white/10 bg-[#101113]/92 py-0 shadow-none">
          <CardHeader className="border-b border-white/10 py-6">
            <CardTitle className="text-white">Lead Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
            <DetailItem label="Phone" value={lead.phone} />
            <DetailItem label="Email" value={lead.email ?? "Not provided"} />
            <DetailItem label="Source" value={LEAD_SOURCE_LABELS[lead.source]} />
            <DetailItem label="Source page" value={lead.sourcePage} />
            <DetailItem label="CTA location" value={lead.ctaLocation} />
            <DetailItem label="Assignee" value={formatLeadAssigneeName(lead.assignedTo)} />
            <DetailItem label="Location" value={lead.location ?? "Not provided"} />
            <DetailItem label="Budget range" value={lead.budgetRange ?? "Not provided"} />
            <DetailItem label="UTM source" value={lead.utmSource ?? "Not captured"} />
            <DetailItem label="UTM medium" value={lead.utmMedium ?? "Not captured"} />
            <DetailItem label="UTM campaign" value={lead.utmCampaign ?? "Not captured"} />
            <DetailItem label="Created at" value={dateFormatter.format(lead.createdAt)} />
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-[#101113]/92 py-0 shadow-none">
          <CardHeader className="border-b border-white/10 py-6">
            <CardTitle className="text-white">Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {lead.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium uppercase tracking-[0.18em] text-amber-200/90">
                      {activity.action.replaceAll("_", " ")}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {dateFormatter.format(activity.occurredAt)}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">
                    {activity.description ?? "No additional context recorded."}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-white/10 bg-[#101113]/92 py-0 shadow-none">
        <CardHeader className="border-b border-white/10 py-6">
          <CardTitle className="text-white">Lead Message</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
            {lead.message ?? "No message was provided with this lead."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</div>
      <div className="text-sm text-white">{value}</div>
    </div>
  );
}
