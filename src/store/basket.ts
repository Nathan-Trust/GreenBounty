import { create } from "zustand";
import { AxiosError } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { Green_Bounty_Routes } from "./route";
import { getFromCookies, saveToCookies } from "./user";

type BasketResponse = {
  success: boolean;
  data: string;
  message: string | null;
};
type BasketDetaiilsResponse = {
  success: boolean;
  data:{
    createdAt: string; // ISO date string
    isDeleted: boolean;
    itemsWeight: number; // Weight in kilograms
    plan: string; // Plan type (e.g., PREMIUM)
    updatedAt: string; // ISO date string
    user: string; // User ID
    __v: number; // Version number
    _id: string; // Unique identifier
  };
  message: string | null;
};


export interface ProcessPayment {
  user: string;
  type: string;
  description: string;
  settlement: number;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  _id: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProcessPaymentApiResponse {
  success: boolean;
  data: ProcessPayment;
  message: string;
}

// Basket state type
export type BasketState = {
  basket: BasketResponse | null;
  basketDetails: BasketDetaiilsResponse | null; // New state to store GET /basket response
  paymentStatus: string; // "idle" | "loading" | "succeeded" | "failed"
  error: string | null;
  loading: boolean;
  transactionDetails: ProcessPayment | null; // Add transaction details here
};

// Basket action types
export type BasketActions = {
  chooseBasket: (
    plan: "STANDARD" | "PREMIUM",
    navigate: (path: string) => void // Add navigate as a second argument
  ) => Promise<void>;
  processBasketPayment: () => Promise<void>;
  fetchBasketDetails: () => Promise<void>; // New action for GET /basket
  setTransactionDetails: (transaction: ProcessPayment) => void; // Action to set transaction details
};

// Basket store type combining state and actions
export type BasketStore = BasketState & BasketActions;

// Create the Zustand store for basket
export const useBasketStore = create<BasketStore>((set) => ({
  basket: null,
  basketDetails: getFromCookies("basketDetails") || null, // Initialize basketDetails as null
  paymentStatus: "idle",
  error: null,
  loading: false,
  transactionDetails: null, // Initialize transactionDetails as null

  chooseBasket: async (
    plan: "STANDARD" | "PREMIUM",
    navigate: (path: string) => void
  ) => {
    set({ loading: true, paymentStatus: "loading", error: null });
    try {
      const response = await axiosInstance.post("/basket", { plan });
      set({
        basket: response.data,
        loading: false,
        paymentStatus: "succeeded",
      });

      if (plan === "PREMIUM" && response.data) {
        window.location.href = response?.data?.data;
      } else {
        navigate(Green_Bounty_Routes.dashboard);
      }
    } catch (error) {
      set({
        loading: false,
        paymentStatus: "failed",
        error: (error as AxiosError).message,
      });
      throw error;
    }
  },

  processBasketPayment: async () => {
    set({ loading: true, paymentStatus: "loading", error: null });
    try {
      const response = await axiosInstance.post("/basket/process-payment");
      // Set transaction details in the store after a successful payment
      set({
        transactionDetails: response.data.data,
        loading: false,
        paymentStatus: "succeeded",
      });
    } catch (error) {
      set({
        loading: false,
        paymentStatus: "failed",
        error: (error as AxiosError).message,
      });
      throw error;
    }
  },

  // Action to fetch basket details
  fetchBasketDetails: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/basket");
      set({
        basketDetails: response.data,
        loading: false,
      });
      saveToCookies("basketDetails", response.data);
    } catch (error) {
      set({
        loading: false,
        error: (error as AxiosError).message,
      });
      throw error;
    }
  },

  // Action to set transaction details
  setTransactionDetails: (transaction: ProcessPayment) => {
    set({ transactionDetails: transaction });
  },
}));
