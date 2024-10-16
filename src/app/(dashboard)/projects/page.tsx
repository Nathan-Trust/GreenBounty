import ProjectsTable from "@/components/projects/ProjectTable";
import ProjectTableEmptyState from "@/components/projects/ProjectTableEmptyState";
import { ProjectTableSkeleton } from "@/components/projects/ProjectTableSkeleton";
import { CustomCardContent } from "@/components/shared/CustomCardHeader";
import CustomTableFilterQuery from "@/components/shared/CustomTableFilterQuery";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { useFetchProjects } from "@/hooks/useFetchProjects";
import { useTableFilter } from "@/hooks/useTableFilter";
import { useProviderContext } from "@/utils/constants";

const ProjectsPage = () => {
  const { user } = useProviderContext();
  const userId = user?._id;
  const { data: projects, isLoading } = useFetchProjects({
    userId: userId ?? "",
  });

  const {
    filteredData: filteredProjects,
    searchTerm,
    setSearchTerm,
    rowsPerPage,
    setRowsPerPage,
    activeView,
    setActiveView,
  } = useTableFilter({
    data: projects,
    initialRowsPerPage: 10,
    searchField: "project_name",
  });

  return (
    <div className="h-full w-full p-3">
      <CustomCardContent
        title="Projects"
        description="List of all users projects"
      >
        <div>
          <CustomTableFilterQuery
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <FetchLoadingAndEmptyState
            isLoading={isLoading}
            numberOfSkeleton={1}
            skeleton={<ProjectTableSkeleton length={5} />}
            emptyState={<ProjectTableEmptyState />}
            data={filteredProjects?.length}
          >
            <ProjectsTable data={filteredProjects || []} />
          </FetchLoadingAndEmptyState>
        </div>
      </CustomCardContent>
    </div>
  );
};

export default ProjectsPage;
