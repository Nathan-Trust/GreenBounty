import axiosInstance from "@/api/axiosInstance";
import { AddRecycablesSchemaType } from "@/schema/add-recycables";

export class RecyclablesService {
  /**
   * Gets the list of all recyclables.
   * @returns A promise that resolves to a list of recyclables.
   * @throws Will throw an error if the request fails.
   */
  static async getRecyclables() {
    try {
      const response = await axiosInstance.get("recycle");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch recyclables: ${error}`);
    }
  }

  /**
   * Creates a new recyclable entry.
   * @param body - Contains the name, description, and other details of the recyclable.
   * @returns A promise that resolves to the data of the created recyclable.
   * @throws Will throw an error if the request fails.
   */
  static async createRecyclable(body: AddRecycablesSchemaType) {
    try {
      const response = await axiosInstance.post("recycle", body);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create recyclable: ${error}`);
    }
  }

  /**
   * Updates an existing recyclable entry.
   * @param body - Contains the _id, new details of the recyclable (e.g., name, quantity, status).
   * @returns A promise that resolves to the updated recyclable data.
   * @throws Will throw an error if the request fails.
   */
  static async updateRecyclable(_id: string, body: AddRecycablesSchemaType) {
    try {
      const response = await axiosInstance.patch(`recycle?_id=${_id}`, body);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update recyclable: ${error}`);
    }
  }

  /**
   * Deletes a recyclable entry.
   * @param id - The id of the recyclable entry to delete.
   * @returns A promise that resolves to the data of the deleted recyclable.
   * @throws Will throw an error if the request fails.
   */
  static async deleteRecyclable(id: string) {
    try {
      const response = await axiosInstance.delete(`recycle?_id=${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete recyclable: ${error}`);
    }
  }
}
