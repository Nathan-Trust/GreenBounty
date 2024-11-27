import axiosInstance from "@/api/axiosInstance";
import { PickupFormSchemaType } from "@/schema/pickup";

export type PickupResponse = {
  success: boolean;
  data: {
    user: string; // User ID
    name: string; // User name
    pickupAddress: string;
    pickupDate: string; // ISO date string
    weight: number; // Weight in kilograms (assuming)
    itemCondition: string; // e.g., "clean"
    recycleItems: string[]; // Array of item IDs
    status: "Pending" | "Accepted" | "Completed" | "Cancelled"; // Example statuses
    isRewarded: boolean; // Has the user been rewarded
    isDeleted: boolean; // Is the pickup record deleted
    createdAt: string; // ISO date string
    acceptedAt: string | null; // ISO date string or null
    rewardedAt: string | null; // ISO date string or null
    _id: string; // Pickup request ID
    __v: number; // MongoDB version key
  };
  message: string; // Response message
};


export class PickupService {
  static async getPickupHistory() {
    const response = await axiosInstance.get("/user/pickup");
    const pickup = response.data.data;
    return pickup;
  }

  static async schedulePickup(
    payload: Omit<PickupFormSchemaType, "weight"> & { weight: number }
  ): Promise<PickupResponse> {
    const response = await axiosInstance.post("/user/pickup", payload);
    return response.data.data;
  }
}
