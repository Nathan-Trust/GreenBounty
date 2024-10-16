import { CustomCardContent } from "@/components/shared/CustomCardHeader";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { TableSkeleton } from "./table/TableSkeleton";
import TableEmptyState from "./table/EmptyState";
import CustomTableFilterQuery from "@/components/shared/CustomTableFilterQuery";
import TableComponent from "./table/Table";

const ProjectUsers = () => {
  const isLoading = false;
  return (
    <div>
      <CustomCardContent
        title="Project Users"
        description="List of all user's projects"
        className="h-fit"
      >
        <div>
          <FetchLoadingAndEmptyState
            isLoading={isLoading}
            numberOfSkeleton={1}
            skeleton={<TableSkeleton length={5} />}
            emptyState={<TableEmptyState />}
            data={2}
          >
            <CustomTableFilterQuery />
            <TableComponent />
          </FetchLoadingAndEmptyState>
        </div>
      </CustomCardContent>{" "}
    </div>
  );
};

export default ProjectUsers;
