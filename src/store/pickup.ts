export const pickupTableHeaders = [
    "",
    "Item Name",
    "No. of Items",
    "Pickup Time",
    "Pickup Date"
]


import { create } from "zustand";
import { AxiosError } from "axios";
import { getFromCookies, saveToCookies } from "./user";
import { PickupFormSchemaType } from "@/schema/pickup";
import { PickupResponse, PickupService } from "@/services/pickup";

export type PickupItem = {
  address: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "canceled";
  user: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

type PaginationMeta = {
  lastPage: number;
  page: number;
  size: number;
  total: number;
};

export type PickupData = {
  data: PickupItem[];
  meta: PaginationMeta;
};

export interface PickupState {
  pickupHistory: PickupData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
}

export type SchedulePickupBody = {
  address: string;
  date: string;
  time: string;
};

export type PickupActions = {
  savePickupHistory: (data: PickupData) => void;
  fetchPickupHistory: () => Promise<void>;
  schedulePickup: (
    body: Omit<PickupFormSchemaType, "weight"> & { weight: number }
  ) => Promise<PickupResponse>;
};

export type PickupStore = PickupState & PickupActions;

export const usePickupStore = create<PickupStore>((set) => ({
  pickupHistory: getFromCookies("pickupHistory") || null,
  status: "idle",
  error: null,
  loading: false,

  // Save pickup history to cookies and state
  savePickupHistory: (data: PickupData) => {
    saveToCookies("pickupHistory", data);
    set({ pickupHistory: data });
  },

  // Fetch pickup history
  fetchPickupHistory: async () => {
    set({ loading: true, status: "loading", error: null });
    try {
      const response = await PickupService.getPickupHistory(); // Ensure this service exists
      set({
        pickupHistory: response?.data,
        loading: false,
        status: "succeeded",
      });
      usePickupStore.getState().savePickupHistory(response?.data);
    } catch (error) {
      set({
        loading: false,
        status: "failed",
        error: (error as AxiosError).message,
      });
      throw error;
    }
  },

  // Schedule a new pickup
  schedulePickup: async (
    body: Omit<PickupFormSchemaType, "weight"> & { weight: number }
  ) => {
    set({ loading: true, status: "loading", error: null });
    try {
      const response = await PickupService.schedulePickup(body); // Ensure this service exists
      set({
        loading: false,
        status: "succeeded",
      });
      return response;
    } catch (error) {
      set({
        loading: false,
        status: "failed",
        error: (error as AxiosError).message,
      });
      throw error;
    }
  },
}));
