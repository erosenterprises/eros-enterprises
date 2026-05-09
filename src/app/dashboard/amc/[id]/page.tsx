import { notFound } from "next/navigation";

import { DashboardDataUnavailable } from "@/features/crm/components/dashboard-data-unavailable";
import { AmcDetailView } from "@/features/projects/components/amc-detail-view";
import { getAmcDetail } from "@/features/projects/repository";

export const dynamic = "force-dynamic";

export default async function DashboardAmcDetailPage(
  props: PageProps<"/dashboard/amc/[id]">,
) {
  const { id } = await props.params;
  let plan;

  try {
    plan = await getAmcDetail(id);
  } catch {
    return <DashboardDataUnavailable title="AMC data unavailable" />;
  }

  if (!plan) {
    notFound();
  }

  return <AmcDetailView plan={plan} />;
}
