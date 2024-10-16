import CompaniesTableEmptyState from "@/components/account/companies/CompaniesEmptyState";
import CompaniesTable from "@/components/account/companies/CompaniesTable";
import { CompaniesTableSkeleton } from "@/components/account/companies/CompaniesTableSkeleton";
import { CustomCardContent } from "@/components/shared/CustomCardHeader";
import CustomTableFilterQuery from "@/components/shared/CustomTableFilterQuery";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";

const CompaniesAccountPage = () => {
  const isLoading = false;
  return (
    <div className="h-full w-full p-3">
      <CustomCardContent title="All Companies" description="List of all companies">
        <div>
          <FetchLoadingAndEmptyState
            isLoading={isLoading}
            numberOfSkeleton={1}
            skeleton={<CompaniesTableSkeleton length={5} />}
            emptyState={<CompaniesTableEmptyState />}
            data={0}
          >
            <CustomTableFilterQuery />
            <CompaniesTable />
          </FetchLoadingAndEmptyState>
        </div>
      </CustomCardContent>
    </div>
  );
};

export default CompaniesAccountPage;
