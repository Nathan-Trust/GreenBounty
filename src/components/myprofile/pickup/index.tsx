import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import PickupTable from "./PickupTable";
import PickupTableEmptyState from "./PickupTableEmptyState";
import { PickupTableSkeleton } from "./PickupTableSkeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CustomDialog from "@/components/shared/CustomDialog";
import SchedulePickup from "./modal/SchedulePickup";
import { getDataValue } from "@/utils/data-value";
import { usePickupStore } from "@/store/pickup";
import { useEffect, useState } from "react";

const Pickup = ({ className }: { className?: string }) => {
  const dataValue = getDataValue();
  const [open ,setOpen]= useState(false)
  const { fetchPickupHistory, loading } = usePickupStore();
  
  useEffect(() => {
    fetchPickupHistory(); 
  },[])

  return (
    <div className={cn("mt-24", className)}>
      <div className="flex items-center justify-between">
        <p>Pickup History</p>
        <CustomDialog
          open={open}
          onOpenChange={() => setOpen(!open)}

          triggerComponent={
            <Button disabled={dataValue !== 100}>Schedule Pickup</Button>
          }
          disabled={dataValue !== 100}
        >
          <SchedulePickup setOpen={setOpen}/>
        </CustomDialog>
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
