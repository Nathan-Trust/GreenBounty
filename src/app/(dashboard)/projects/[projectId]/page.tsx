import {
  ProjectDetailsEmptyState,
  ProjectDetailsSkeleton,
  SingleProjectDataDisplay,
} from "@/components/projects/[projectId]";
import ProjectGallery from "@/components/projects/[projectId]/gallery/page";
import ProjectLogs from "@/components/projects/[projectId]/lo/page";
import ProjectMaterials from "@/components/projects/[projectId]/material/page";
import { ProjectsTab } from "@/components/projects/[projectId]/ProjectsTab";
import ProjectUsers from "@/components/projects/[projectId]/users/page";
import { CustomCardContent } from "@/components/shared/CustomCardHeader";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { Button } from "@/components/ui/button";
import { useFetchProjectById } from "@/hooks/useFetchProjects";
import { ProjectTabItems, projectTabItems } from "@/store/single-project";
import { formatDate } from "@/utils/date";
import { ReactNode } from "react";
import { useParams, useSearchParams } from "react-router-dom";

interface SingleProjectTitleProps {
  filteredData: {
    title?: string;
  };
}

const SingleProjectTitle = ({ filteredData }: SingleProjectTitleProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <p>{filteredData?.title}</p>
      <div className="flex gap-4 h-7 mt-4 lg:mt-0">
        <Button className="h-full rounded-sm">Edit</Button>
        <Button className="bg-lightGray border-lightGray_three hover:bg-lightGray border text-lightGray_three h-full rounded-sm">
          Deactivate
        </Button>
      </div>
    </div>
  );
};

const SingleProjectPage = () => {
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "logs";

  const { data: projectData, isLoading } = useFetchProjectById({
    projectId: projectId ?? "",
  });


  const renderProjectTabs = projectTabItems.map((item) => {
    const isActive = item === tab;
    return (
      <ProjectsTab
        key={item}
        projectId={projectId!}
        isActive={isActive}
        item={item}
      />
    );
  });

  const renderTabs: Record<ProjectTabItems, ReactNode> = {
    logs: <ProjectLogs />,
    gallery: <ProjectGallery />,
    users: <ProjectUsers />,
    materials: <ProjectMaterials />,
  };

  const filteredData = {
    id: projectData?.project_number ?? "",
    user: projectData?.user_id ?? "",
    number: projectData?.project_number ?? "",
    title: projectData?.project_name ?? "",
    location: projectData?.location ?? "",
    startDate: formatDate(projectData?.start_date) ?? "",
    duration: projectData?.duration ?? "",
    durationType: projectData?.project_type ?? "",
    type: projectData?.project_type ?? "",
  };

  return (
    <div className="w-full p-3 flex flex-col gap-3 h-fit">
      <CustomCardContent
        title={<SingleProjectTitle filteredData={filteredData} />}
        className="h-fit"
      >
        <FetchLoadingAndEmptyState
          isLoading={isLoading}
          numberOfSkeleton={1}
          skeleton={<ProjectDetailsSkeleton length={10} />}
          emptyState={<ProjectDetailsEmptyState />}
          data={projectData ? 1 : 0}
        >
          <SingleProjectDataDisplay customData={filteredData} />
        </FetchLoadingAndEmptyState>
      </CustomCardContent>
      <div className="rounded-lg flex gap-4  bg-card text-card-foreground shadow-sm px-6 ">
        {renderProjectTabs}
      </div>
      <div>{renderTabs[tab as ProjectTabItems]}</div>
    </div>
  );
};

export default SingleProjectPage;
