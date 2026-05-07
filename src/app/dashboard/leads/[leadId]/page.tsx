import { notFound } from "next/navigation";

import { LeadDetailView } from "@/features/leads/components/lead-detail-view";
import { getLeadDetail } from "@/features/leads/repository";

export const dynamic = "force-dynamic";

export default async function DashboardLeadDetailPage(
  props: PageProps<"/dashboard/leads/[leadId]">,
) {
  const { leadId } = await props.params;
  const lead = await getLeadDetail(leadId);

  if (!lead) {
    notFound();
  }

  return <LeadDetailView lead={lead} />;
}
