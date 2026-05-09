import { notFound } from "next/navigation";

import { DashboardDataUnavailable } from "@/features/crm/components/dashboard-data-unavailable";
import { CustomerDetailView } from "@/features/customers/components/customer-detail-view";
import { getCustomerDetail } from "@/features/customers/repository";

export const dynamic = "force-dynamic";

export default async function DashboardCustomerDetailPage(
  props: PageProps<"/dashboard/customers/[id]">,
) {
  const { id } = await props.params;
  let customer;

  try {
    customer = await getCustomerDetail(id);
  } catch {
    return <DashboardDataUnavailable title="Customer data unavailable" />;
  }

  if (!customer) {
    notFound();
  }

  return <CustomerDetailView customer={customer} />;
}
