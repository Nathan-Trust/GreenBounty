import { useStore } from "@/store/user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { recyclableItems } from "@/store/add-recycables";
import premiumBasket from "../../../assets/baskets/premiumBasketSvg.svg"

const AddRecycablesClient = () => {
  const { userData } = useStore();

  // Check if userData?.basket exists before applying string methods
  const basketType =
    userData?.basket &&
    userData.basket.charAt(0).toUpperCase() +
      userData.basket.slice(1).toLowerCase();

  // Define which items should have the "bg-primary" class based on basketType
  const itemsWithBgPrimary =
    basketType === "Premium"
      ? recyclableItems
      : ["Plastics", "Nylons", "Bottles"];

  let basketImageSrc;
  switch (basketType) {
    case "Premium":
      basketImageSrc = premiumBasket;
      break;
    case "Standard":
      basketImageSrc = "path_to_standard_basket_image.svg";
      break;
    default:
      basketImageSrc = "path_to_default_basket_image.svg";
  }

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

      <div className="mt-6">
        <p>Category</p>
        <div className="flex gap-x-0.5 gap-y-1 mt-2 lg:w-1/2  flex-wrap">
          {recyclableItems.map((item) => (
            <Button
              key={item}
              className={`w-fit h-8 rounded-full ${
                itemsWithBgPrimary.includes(item)
                  ? "bg-primary"
                  : "bg-[#d6e1cf] hover:bg-[#d6e1cf]"
              }`}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddRecycablesClient;
