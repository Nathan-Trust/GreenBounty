import { useStore } from "@/store/user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import premiumBasket from "../../../assets/baskets/premiumBasketSvg.svg";
import standardBasket from "../../../assets/baskets/standard basket svg.svg"
import AddRecycablesApexLineChart, {
  Category,
  Duration,
} from "@/components/add-recycables/RecycablesLineChart";
import { DropDown } from "@/components/shared/CustomDropdown";
import { useEffect, useState } from "react";
import CustomSheet from "@/components/shared/CustomSheetDrawer";
import RecycablesDrawer from "@/components/add-recycables/drawer";
import { useRecyclablesStore } from "@/store/add-recycables";
import { Green_Bounty_Routes } from "@/store/route";
import { useNavigate } from "react-router-dom";

const AddRecycablesClient = () => {
  const { userData } = useStore();
  const navigate = useNavigate();
  const { recyclables, fetchRecyclables } = useRecyclablesStore();
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.PLASTIC
  );
  const [selectedDuration, setSelectedDuration] = useState<Duration>(
    Duration.Day
  );

  useEffect(() => {
    fetchRecyclables();
  }, []);

  const basketType =
    userData?.basket &&
    userData.basket.charAt(0).toUpperCase() +
      userData.basket.slice(1).toLowerCase();

  const itemsWithBgPrimary =
    basketType === "Premium"
      ? Object.values(Category) // Use enum values directly
      : [Category.PLASTIC, Category.NYLON, Category.PAPER];

  let basketImageSrc;
  switch (basketType) {
    case "Premium":
      basketImageSrc = premiumBasket;
      break;
    case "Standard":
      basketImageSrc = standardBasket;
      break;
    default:
      basketImageSrc = standardBasket;
  }

  const options = itemsWithBgPrimary.map((item) => ({
    value: item,
    label: item,
  }));

  const handleSelectItem = (selectedItem: string) => {
    if (Object.values(Category).includes(selectedItem as Category)) {
      setSelectedCategory(selectedItem as Category);
    }
  };

  const handleSelectDuration = (selectedDuration: string) => {
    if (Object.values(Duration).includes(selectedDuration as Duration)) {
      setSelectedDuration(selectedDuration as Duration);
    }
  };

  const existingItems = recyclables?.data?.map((item) => item?.item) || [];

  return (
    <div className="p-1.5 mini-md:p-6 max-w-screen-lg mx-auto gap-4 mini-md:gap-6">
      <p className="capitalize text-lg">{basketType} basket</p>
      <div className="mt-2">
        <div className="bg-[#d6e1cf] h-60 md:w-80 rounded-lg flex items-center justify-center">
          <Avatar className="w-44 h-44 object-cover">
            <AvatarImage src={basketImageSrc} />
          </Avatar>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 lg:flex-row justify-between">
        <div className="flex-1">
          <p>Category</p>
          <div className="flex gap-x-0.5 gap-y-1 mt-2 lg:w-1/2 flex-wrap">
            {Object.values(Category).map((item) => (
              <CustomSheet
                key={item}
                title="Recycables"
                triggerComponent={
                  <Button
                    className={`w-fit h-8 rounded-full ${
                      itemsWithBgPrimary.includes(item)
                        ? "bg-primary"
                        : "bg-[#d6e1cf] hover:bg-[#d6e1cf]"
                    }`}
                    disabled={existingItems.includes(item)} // Disable if already in recyclables
                    onClick={() => {
                      handleSelectItem(item);
                      navigate(
                        Green_Bounty_Routes.addRecycablesTab("addRecycables")
                      );
                    }}
                  >
                    {item}
                  </Button>
                }
              >
                <RecycablesDrawer selectedItem={selectedCategory} />
              </CustomSheet>
            ))}
          </div>
        </div>

        <CustomSheet
          title="Recycables"
          triggerComponent={
            <Button
              className="self-end lg:self-start"
              onClick={() =>
                navigate(Green_Bounty_Routes.addRecycablesTab("viewRecycables"))
              }
            >
              View Recycables
            </Button>
          }
        >
          <RecycablesDrawer selectedItem={selectedCategory} />
        </CustomSheet>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <p>Category</p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <DropDown
            options={options}
            label="Category"
            onSelect={handleSelectItem}
            className="mt-4 w-[180px]"
          />
          <DropDown
            options={[
              { value: "Day", label: "Day" },
              { value: "Month", label: "Month" },
              { value: "Year", label: "Year" },
            ]}
            label="Duration"
            onSelect={handleSelectDuration}
            className="mt-4 w-[180px]"
          />
        </div>
      </div>

      <div className="w-full h-86">
        <AddRecycablesApexLineChart
          category={selectedCategory}
          duration={selectedDuration}
        />
      </div>
    </div>
  );
};

export default AddRecycablesClient;
