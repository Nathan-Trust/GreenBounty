import { ReactNode, useEffect, useState } from "react";
import {
  addRecycableTabItems,
  useRecyclablesStore,
} from "@/store/add-recycables";
import { Category } from "../RecycablesLineChart";
import { AddRecycablesType } from "@/models/add-recycables";
import Tabs from "@/components/shared/CustomTabs";
import { Green_Bounty_Routes } from "@/store/route";
import ViewRTab from "./tabs/ViewRTab";
import AddRTab from "./tabs/AddRTab";
import { useNavigate, useSearchParams } from "react-router-dom";

const RecycablesDrawer = ({ selectedItem }: { selectedItem: Category }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tab = (searchParams.get("tab") as AddRecycablesType) ?? "addRecycables"; // Ensure `tab` has a default value

  const tabMapping: Record<AddRecycablesType, number> = {
    addRecycables: 0,
    viewRecycables: 1,
  };

  const { recyclables, fetchRecyclables } = useRecyclablesStore();

  useEffect(() => {
    fetchRecyclables();
  }, []);

  useEffect(() => {
    setActiveIndex(tabMapping[tab] ?? 0); 
  }, [tab]);

  // Filter out existing items from the select options
  const existingItems = recyclables?.data?.map((item) => item.item) || [];
  const availableItems = Object.values(Category).filter(
    (item) => !existingItems.includes(item)
  );

  // Conditionally disable the first tab if no available items
  const disabledTabs = availableItems.length === 0 ? [0] : [];

  useEffect(() => {
    if (disabledTabs.includes(0) && activeIndex === 0) {
      setActiveIndex(1); 
      navigate(Green_Bounty_Routes.addRecycablesTab("viewRecycables"));
    }
  }, [disabledTabs, activeIndex, navigate]);

  const renderAddRecycablesTab = (
    <Tabs
      labels={addRecycableTabItems.map((label) =>
        label === "addRecycables" ? "Add Recyclables" : "View Recycables"
      )}
      links={[
        Green_Bounty_Routes.addRecycablesTab("addRecycables"),
        Green_Bounty_Routes.addRecycablesTab("viewRecycables"),
      ]}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      disabledTabs={disabledTabs} // Pass disabledTabs prop
    />
  );

  const renderTabs: Record<AddRecycablesType, ReactNode> = {
    addRecycables: (
      <AddRTab availableItems={availableItems} selectedItem={selectedItem} />
    ),
    viewRecycables: <ViewRTab />,
  };

  return (
    <div className="w-full flex flex-col pb-16 ">
      {renderAddRecycablesTab}
      <div className="mt-1 overflow-y-auto h-full">{renderTabs[tab]}</div>
    </div>
  );
};

export default RecycablesDrawer;
