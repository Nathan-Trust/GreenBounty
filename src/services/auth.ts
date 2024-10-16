import axiosInstance from "@/api/axiosInstance";
import { APIs } from "./API";

// Define the shape of the User object
export interface User {
  status: string;
  unique_id: string;
  user_id: string;
}

export class AuthService {
  // Login
  static async login(email: string, password: string): Promise<User> {
    const response = await axiosInstance.post(APIs.login.url as string, {
      email,
      password,
    });
    const userData = response.data;
    // Store user data and token in local storage
    localStorage.setItem("initial_user_response", JSON.stringify(userData));
    localStorage.setItem("access_token", userData?.accessToken);

    // Return user data
    return userData;
  }

  // Reset Password
  static async resetPassword(email: string): Promise<void> {
    await axiosInstance.post(APIs.resetPassword.url as string, { email });
  }
}
