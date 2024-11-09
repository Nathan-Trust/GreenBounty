import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import PickupTable from "./PickupTable";
import PickupTableEmptyState from "./PickupTableEmptyState";
import { PickupTableSkeleton } from "./PickupTableSkeleton";
import { Button } from "@/components/ui/button";

const Pickup = () => {
  const loading = false;
  return (
    <div className="mt-24">
      <div className="flex items-center justify-between">
              <p>Pickup History</p>
              <Button>Schedule Pickup</Button>
      </div>
      <FetchLoadingAndEmptyState
        isLoading={loading}
        numberOfSkeleton={1}
        skeleton={<PickupTableSkeleton length={3} />}
        emptyState={<PickupTableEmptyState />}
        data={1}
      >
        <PickupTable />
      </FetchLoadingAndEmptyState>
    </div>
  );
};

export default Pickup;
