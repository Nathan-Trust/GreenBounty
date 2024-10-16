import SettingsEmptyState from "@/components/settings/SettingsEmptyState";
import SettingsTable from "@/components/settings/SettingsTable";
import { SettingsTableSkeleton } from "@/components/settings/SettingsTableSkeleton";
import { CustomCardContent } from "@/components/shared/CustomCardHeader";
import CustomTableFilterQuery from "@/components/shared/CustomTableFilterQuery";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { Button } from "@/components/ui/button";

const AdminSettingsTitle = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        <p className="text-lg font-semibold leading-none tracking-tight">
          Admins
        </p>
        <p className="text-sm text-muted-foreground"> List of all users</p>
      </div>
      <Button className="h-full rounded-sm">Edit</Button>
    </div>
  );
};

const SettingsPage = () => {
  const isLoading = false;
  return (
    <div className="w-full p-3 flex flex-col gap-3 h-fit">
      <CustomCardContent title={<AdminSettingsTitle />} className="h-fit">
        <div>
          <FetchLoadingAndEmptyState
            isLoading={isLoading}
            numberOfSkeleton={1}
            skeleton={<SettingsTableSkeleton length={5} />}
            emptyState={<SettingsEmptyState />}
            data={undefined}
          >
            <CustomTableFilterQuery />
            <SettingsTable />
          </FetchLoadingAndEmptyState>
        </div>
      </CustomCardContent>
    </div>
  );
};

export default SettingsPage;
