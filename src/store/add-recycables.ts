import { create } from "zustand";
import { AxiosError } from "axios";
import { RecyclablesService } from "@/services/add-recycables";
import { AddRecycablesSchemaType } from "@/schema/add-recycables";
import { getFromCookies, saveToCookies } from "./user";
import { AddRecycablesType } from "@/models/add-recycables";


export const addRecycableTabItems: AddRecycablesType[] = [
  "addRecycables",
  "viewRecycables",
];


// Define the array of recyclable items
export const recyclableItems = [
  "Plastics",
  "Metals",
  "Nylons",
  "Cans",
  "Iron",
  "Bottles",
];

export type RecyclableItem = {
  basket: string;
  createdAt: string;
  isDeleted: boolean;
  item: string;
  quantity: number;
  updatedAt: string;
  user: string;
  weight: number;
  __v: number;
  _id: string;
};

// Define a type for the meta information
type PaginationMeta = {
  lastPage: number;
  page: number;
  size: number;
  total: number;
};

// Define the full type alias for the data structure
export type RecyclableData = {
  data: RecyclableItem[];
  meta: PaginationMeta;
};

export interface RecyclablesState {
  recyclables: RecyclableData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
  selectedRecyclable: RecyclableItem | null;
}

export type RecyclablesActions = {
  saveRecycables: (data: RecyclableData) => void;
  fetchRecyclables: () => Promise<void>;
  createRecyclable: (body: AddRecycablesSchemaType) => Promise<void>;
  updateRecyclable: (
    _id: string,
    body: AddRecycablesSchemaType
  ) => Promise<void>;
  deleteRecyclable: (id: string) => Promise<void>;
};

export type RecyclablesStore = RecyclablesState & RecyclablesActions;

export const useRecyclablesStore = create<RecyclablesStore>((set) => ({
  recyclables: getFromCookies("recycables") || null,
  status: "idle",
  error: null,
  loading: false,
  selectedRecyclable: null,

  saveRecycables: (data: RecyclableData) => {
    saveToCookies("recycables", data);
    set({ recyclables: data });
  },

  // Fetch the list of recyclables
  fetchRecyclables: async () => {
    set({ loading: true, status: "loading", error: null });
    try {
      const response = await RecyclablesService.getRecyclables();
      set({
        recyclables: response.data,
        loading: false,
        status: "succeeded",
      });
      useRecyclablesStore.getState().saveRecycables(response.data);
    } catch (error) {
      set({
        loading: false,
        status: "failed",
        error: (error as AxiosError).message,
      });
      throw error;
    }
  },

  // Create a new recyclable entry
  createRecyclable: async (body: AddRecycablesSchemaType) => {
    set({ status: "loading", error: null });
    try {
      const response = await RecyclablesService.createRecyclable(body);
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

  // Update an existing recyclable entry
  updateRecyclable: async (_id, body) => {
    set({ status: "loading", error: null });
    try {
      const response = await RecyclablesService.updateRecyclable(_id, body);
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

  // Delete a recyclable entry
  deleteRecyclable: async (id: string) => {
    set({ status: "loading", error: null });
    try {
      const response = await RecyclablesService.deleteRecyclable(id);
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



