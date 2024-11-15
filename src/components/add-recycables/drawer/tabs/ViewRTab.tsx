import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import RecycablesEmptyState from "../RecycablesEmptyState";
import { RecycablesSkeleton } from "../RecycablesSkeleton";
import { useRecyclablesStore } from "@/store/add-recycables";
import Recycables from "../Recycables";

const ViewRTab = () => {
  const { recyclables, loading } = useRecyclablesStore();

  return (
    <div>
      <FetchLoadingAndEmptyState
        isLoading={loading}
        numberOfSkeleton={1}
        skeleton={<RecycablesSkeleton length={4} />}
        emptyState={<RecycablesEmptyState />}
        data={recyclables?.data?.length}
      >
        <Recycables />
      </FetchLoadingAndEmptyState>
    </div>
  );
}

export default ViewRTab