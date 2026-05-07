import type { LeadPriority, LeadStatus } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import {
  LEAD_PRIORITY_LABELS,
  LEAD_STATUS_LABELS,
} from "@/features/leads/constants";
import { cn } from "@/lib/utils";

const statusClasses: Record<LeadStatus, string> = {
  NEW: "border-sky-400/20 bg-sky-400/12 text-sky-100",
  CONTACTED: "border-blue-400/20 bg-blue-400/12 text-blue-100",
  QUALIFIED: "border-violet-400/20 bg-violet-400/12 text-violet-100",
  SITE_VISIT_SCHEDULED: "border-amber-400/20 bg-amber-400/12 text-amber-100",
  QUOTATION_SENT: "border-fuchsia-400/20 bg-fuchsia-400/12 text-fuchsia-100",
  WON: "border-emerald-400/20 bg-emerald-400/12 text-emerald-100",
  LOST: "border-rose-400/20 bg-rose-400/12 text-rose-100",
};

const priorityClasses: Record<LeadPriority, string> = {
  LOW: "border-zinc-500/20 bg-zinc-500/10 text-zinc-200",
  MEDIUM: "border-slate-400/20 bg-slate-400/10 text-slate-100",
  HIGH: "border-amber-400/20 bg-amber-400/12 text-amber-100",
  URGENT: "border-rose-400/20 bg-rose-400/12 text-rose-100",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("h-7 rounded-full px-3 text-[11px] uppercase tracking-[0.18em]", statusClasses[status])}
    >
      {LEAD_STATUS_LABELS[status]}
    </Badge>
  );
}

export function LeadPriorityBadge({ priority }: { priority: LeadPriority }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-7 rounded-full px-3 text-[11px] uppercase tracking-[0.18em]",
        priorityClasses[priority],
      )}
    >
      {LEAD_PRIORITY_LABELS[priority]}
    </Badge>
  );
}
