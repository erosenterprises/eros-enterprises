import { notFound } from "next/navigation";

import { DashboardDataUnavailable } from "@/features/crm/components/dashboard-data-unavailable";
import { ProjectDetailView } from "@/features/projects/components/project-detail-view";
import {
  getProjectDetail,
  getProjectManagementOptions,
} from "@/features/projects/repository";

export const dynamic = "force-dynamic";

export default async function DashboardProjectDetailPage(
  props: PageProps<"/dashboard/projects/[id]">,
) {
  const { id } = await props.params;
  let project;
  let options;

  try {
    [project, options] = await Promise.all([
      getProjectDetail(id),
      getProjectManagementOptions(),
    ]);
  } catch {
    return <DashboardDataUnavailable title="Project data unavailable" />;
  }

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} options={options} />;
}
