import UsersTable from "@/components/account/user/UsersTable";
import UsersTableEmptyState from "@/components/account/user/UsersTableEmptyState";
import { UsersTableSkeleton } from "@/components/account/user/UsersTableSkeleton";
import { CustomCardContent } from "@/components/shared/CustomCardHeader";
import CustomTableFilterQuery from "@/components/shared/CustomTableFilterQuery";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";


const UsersAccountPage = () => {
  const isLoading = false
  return (
    <div className="h-full w-full p-3">
      <CustomCardContent title="All Users" description="List of all users">
        <div>
          <FetchLoadingAndEmptyState
            isLoading={isLoading}
            numberOfSkeleton={1}
            skeleton={<UsersTableSkeleton length={5} />}
            emptyState={<UsersTableEmptyState />}
            data={2}
          >
            <CustomTableFilterQuery />
            <UsersTable />
          </FetchLoadingAndEmptyState>
        </div>
      </CustomCardContent>
    </div>
  );
};

export default UsersAccountPage;
