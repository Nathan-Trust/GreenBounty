import axiosInstance from "@/api/axiosInstance";
import { APIs } from "./API";

export type User = {
  _id: string;
  unique_id: string;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
  role: string;
  workspace: string;
  isGoogleAuth: boolean;
  isLoggedOut: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  accessToken: string;
};


export class UserService {
  // Get Current User
  static async getCurrentUser(userId: string): Promise<User> {
    const url =
      typeof APIs.getCurrentUser.url === "function"
        ? APIs.getCurrentUser.url({ userId })
        : APIs.getCurrentUser.url;

    const response = await axiosInstance.get(url);
      const user = response.data.user;

    localStorage.setItem("user", JSON.stringify(response.data.user));

    return user
  }
}
