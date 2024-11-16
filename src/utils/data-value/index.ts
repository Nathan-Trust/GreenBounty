import { MAX_WEIGHT } from "@/config"; // Import MAX_WEIGHT from your config
import { useBasketStore } from "@/store/basket";

export const getDataValue = () => {
  const basketDetails = useBasketStore.getState().basketDetails; // Access Zustand state
  if (!basketDetails?.data?.itemsWeight) return 0;
  return Math.min((basketDetails.data.itemsWeight / MAX_WEIGHT) * 100, 100);
};
