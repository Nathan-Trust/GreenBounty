import { create } from "zustand";
import { AxiosError } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { Green_Bounty_Routes } from "./route";

type BasketResponse = {
  success: boolean;
  data: string;
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
  setTransactionDetails: (transaction: ProcessPayment) => void; // Action to set transaction details
};

// Basket store type combining state and actions
export type BasketStore = BasketState & BasketActions;

// Create the Zustand store for basket
export const useBasketStore = create<BasketStore>((set) => ({
  basket: null,
  paymentStatus: "idle",
  error: null,
  loading: false,
  transactionDetails: null, // Initialize transactionDetails as null

 chooseBasket: async (plan: "STANDARD" | "PREMIUM", navigate: (path: string) => void) => {
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
}
,

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

  // Action to set transaction details
  setTransactionDetails: (transaction: ProcessPayment) => {
    set({ transactionDetails: transaction });
  },
}));
