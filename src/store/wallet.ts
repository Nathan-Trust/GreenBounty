import { create } from "zustand";
import { User } from "@/services/user";
import { WithdrawalService } from "@/services/wallet";
import { AddWithdrawalAccountFormSchemaType } from "@/schema/wallet";
import { AxiosError } from "axios";

export interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Transaction data structure
export interface TransactionData {
  _id: string;
  user: User;
  type: string;
  description: string;
  totalAmount: number;
  status: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Meta information for pagination
export interface Meta {
  total: number;
  page: number;
  size: number;
  lastPage: number;
}

export interface TransactionsResponse {
  success: boolean;
  data: {
    data: TransactionData[];
    meta: Meta;
  };
  message: string;
}

export interface CompletedOrderTransactions {
  data: TransactionData[];
  meta: Meta;
}

// Type for individual account details in the data array
type AccountData = {
  _id: string;
  merchant: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Main response type
export type WithdrawerApiResponse = {
  success: true;
  data: {
    data: AccountData[];
    meta: Meta;
  };
  message: string;
};

export interface Accounts {
  data: AccountData[];
  meta: Meta;
}

export type AccountState = {
  accounts: Accounts | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
};

interface UpdateWithdrawalAccountBody {
  _id?: string;
}
type UpdateWithdrawalAccount = UpdateWithdrawalAccountBody &
  AddWithdrawalAccountFormSchemaType;

export type AccountActions = {
  fetchAccounts: () => Promise<void>;
  handleCreateWithdrawalAccount: (
    body: AddWithdrawalAccountFormSchemaType
  ) => Promise<void>;
  handleUpdateWithdrawalAccount: (
    body: UpdateWithdrawalAccount
  ) => Promise<void>;
  handleDeleteWithdrawalAccount: (id: string) => Promise<void>;
};

export type AccountStore = AccountState & AccountActions;


export const useAccountStore = create<AccountStore>((set) => ({
  accounts: null,
  status: "idle",
  error: null,
  loading: false,
  /**
   * Fetches the list of withdrawal accounts linked to the merchant.
   *
   * @returns A promise that resolves to the data of the withdrawal accounts.
   * @throws Will throw an error if the request fails.
   */
  fetchAccounts: async () => {
    set({ loading: true, status: "loading", error: null });
    try {
      const response = await WithdrawalService.getWithdrawalAccounts();
      set({
        loading: false,
        accounts: response.data,
        status: "succeeded",
      });
      return response;
    } catch (error) {
      set({ loading: false, status: "failed", error: "" });
      throw error;
    }
  },
  /**
   * Creates a withdrawal account.
   *
   * @param body - The body of the request. It must contain the account name, account number, and bank name.
   *
   * @returns A promise that resolves to the data of the created withdrawal account.
   * @throws Will throw an error if the request fails.
   */
  handleCreateWithdrawalAccount: async (
    body: AddWithdrawalAccountFormSchemaType
  ) => {
    set({ status: "loading", error: null });
    try {
      const response = await WithdrawalService.createWithdrawalAccount(body);
      set({ loading: false, status: "succeeded" });
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
  /**
   * Updates a withdrawal account.
   *
   * @param body - The body of the request. It must contain the _id of the withdrawal account to update, the new account name, account number, and bank name.
   *
   * @returns A promise that resolves to the data of the updated withdrawal account.
   * @throws Will throw an error if the request fails.
   */
  handleUpdateWithdrawalAccount: async (body: UpdateWithdrawalAccount) => {
    set({ status: "loading", error: null });
    try {
      const response = await WithdrawalService.updateWithdrawalAccount(body);
      set({ loading: false, status: "succeeded" });
      return response;
    } catch (error) {
      set({ loading: false, status: "failed", error: (error as AxiosError).message });
      throw error;
    }
  },
  /**
   * Deletes a withdrawal account.
   *
   * @param id - The id of the withdrawal account to delete.
   *
   * @returns A promise that resolves to the data of the deleted withdrawal account.
   * @throws Will throw an error if the request fails.
   */
  handleDeleteWithdrawalAccount: async (id: string) => {
    set({ status: "loading", error: null });

    try {
      const response = await WithdrawalService.deleteWithdrawalAccount(id);
      set({ loading: false, status: "succeeded" });
      return response;
    } catch (error) {
      set({ loading: false, status: "failed", error: (error as AxiosError).message });
      throw error;
    }
  },
}));
