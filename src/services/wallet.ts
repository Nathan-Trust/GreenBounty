import axiosInstance from "@/api/axiosInstance";
import { WithdrawFormSchemaType } from "@/schema/wallet";

export class WithdrawalService {
  /**
   * Handles the withdrawal process for a specified account.
   * @param body - Contains the account ID, amount, and description for the withdrawal.
   * @returns A promise that resolves to the data of the withdrawal response.
   * @throws Will throw an error if the request fails.
   */
  static async withdraw(body: WithdrawFormSchemaType) {
    try {
      const response = await axiosInstance.post(
        "user/withdrawer",
        body
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to process withdrawal: ${error}`);
    }
  }

  /**
   * Gets the list of withdrawal accounts linked to the merchant.
   * @returns A promise that resolves to a list of withdrawal accounts.
   * @throws Will throw an error if the request fails.
   */
  static async getWithdrawalAccounts() {
    try {
      const response = await axiosInstance.get("user/withdrawer-account");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch withdrawal accounts: ${error}`);
    }
  }

  /**
   * Creates a withdrawal account.
   * @param body - Contains the account name, account number, and bank name.
   * @returns A promise that resolves to the data of the created withdrawal account.
   * @throws Will throw an error if the request fails.
   */
  static async createWithdrawalAccount(body: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  }) {
    try {
      const response = await axiosInstance.post(
        "user/withdrawer-account",
        body
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create withdrawal account: ${error}`);
    }
  }

  /**
   * Updates a withdrawal account.
   * @param body - Contains the _id, new account name, account number, and bank name.
   * @returns A promise that resolves to the data of the updated withdrawal account.
   * @throws Will throw an error if the request fails.
   */
  static async updateWithdrawalAccount(body: {
    _id?: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
  }) {
    try {
      const response = await axiosInstance.patch(
        "user/withdrawer-account",
        body
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update withdrawal account: ${error}`);
    }
  }

  /**
   * Deletes a withdrawal account.
   * @param id - The id of the withdrawal account to delete.
   * @returns A promise that resolves to the data of the deleted withdrawal account.
   * @throws Will throw an error if the request fails.
   */
  static async deleteWithdrawalAccount(id: string) {
    try {
      const response = await axiosInstance.delete(
        `user/withdrawer-account?_id=${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete withdrawal account: ${error}`);
    }
  }
}
