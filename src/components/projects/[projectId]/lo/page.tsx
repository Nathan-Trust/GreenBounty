import { CustomCardContent } from "@/components/shared/CustomCardHeader";
import CustomTableFilterQuery from "@/components/shared/CustomTableFilterQuery";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import TableComponent from "./table/Table";
import { TableSkeleton } from "./table/TableSkeleton";
import TableEmptyState from "./table/EmptyState";
import { useParams } from "react-router-dom";
import { useFetchProjectLogs } from "@/hooks/useFetchProjects";
import { useTableFilter } from "@/hooks/useTableFilter";

const ProjectLogs = () => {
  const { projectId } = useParams();

  const { data: projectLogs, isLoading } = useFetchProjectLogs({
    projectId: projectId ?? "",
  });


  const {
    filteredData: filteredProjectsLogs,
    searchTerm,
    setSearchTerm,
    rowsPerPage,
    setRowsPerPage,
    activeView,
    setActiveView,
  } = useTableFilter({
    data: projectLogs,
    initialRowsPerPage: 10,
    searchField: "log_title",
  });

  return (
    <div>
      <CustomCardContent
        title="Projects"
        description="List of all user's projects"
        className="h-fit"
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
            skeleton={<TableSkeleton length={5} />}
            emptyState={<TableEmptyState />}
            data={filteredProjectsLogs?.length}
          >
            <TableComponent projectLogs={filteredProjectsLogs} />
          </FetchLoadingAndEmptyState>
        </div>
      </CustomCardContent>{" "}
    </div>
  );
};

export default ProjectLogs;
