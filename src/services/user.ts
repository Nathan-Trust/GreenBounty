import axiosInstance from "@/api/axiosInstance";
import { APIs } from "./API";

export type User = {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  profilePhoto: string | null,
  role: "USER" | "ADMIN" | "MODERATOR"; // Assuming possible roles
  basket: "STANDARD" | "PREMIUM" | "BASIC"; // Assuming possible basket types
  referralCode: string;
  referredBy?: string;
  totalReferrals: number;
  wallet: number;
  isGoogleAuth: boolean;
  isLoggedOut: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  accessToken: string;
};

export class UserService {
  // Get Current User
  static async getCurrentUser(): Promise<User> {
    const response = await axiosInstance.get(APIs.getCurrentUser.url as string);
    const user = response.data.data;

    return user;
  }
}
