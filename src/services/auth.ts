import axiosInstance from "@/api/axiosInstance";
import { APIs } from "./API";
import { logger } from "@/utils/logger";
import {
  SignUpDataWithoutTerms,
  VerifyOtpFormSchemaType,
  ForgotPasswordSchemaType,
  ChangePasswordSchemaType,
} from "@/schema/auth";
import { User } from "./user";

export class AuthService {
  // Login
  static async login(email: string, password: string): Promise<User> {
    const response = await axiosInstance.post(APIs.login.url as string, {
      email,
      password,
    });
    const userData = response.data.data;
    return userData;
  }

  // Signup
  public static async signUp(
    data: SignUpDataWithoutTerms
  ): Promise<SignUpDataWithoutTerms> {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      const userData = response.data; // Type assertion for clarity
      return userData;
    } catch (error) {
      logger("Signup failed:", error);
      throw error;
    }
  }
  // send otp to email
  public static async verifyEmail(email: string): Promise<void> {
    await axiosInstance.post("auth/verify-email/otp", { email });
  }
  // verify email otp
  public static async verifyEmailOtp(
    data: VerifyOtpFormSchemaType
  ): Promise<{ success: boolean; message: string }> {
    // Specify the return type
    const numericCode = Number(data.code);

    // Create a new object with the numeric code
    const requestData = {
      ...data,
      code: numericCode, // Ensure the code is sent as a number
    };

    try {
      const response = await axiosInstance.post(
        "auth/verify-email",
        requestData
      );
      return response.data; // Return the response data
    } catch (error) {
      logger("Email verification failed:", error);
      throw error;
    }
  }
  // forgot password
  public static async forgotPassword(
    data: ForgotPasswordSchemaType
  ): Promise<void> {
    await axiosInstance.post("auth/forgot-password", data);
  }
  // reset password
  public static async resetPassword(
    data: ChangePasswordSchemaType
  ): Promise<{ success: boolean; message: string }> {
    const response = await axiosInstance.post(
      "auth/forgot-password/update",
      data
    );
    return response.data;
  }

  // choose basket
  public static async chooseBasket(
    data: "STANDARD" | "PREMIUM"
  ): Promise<{ success: boolean; data: User; message: string | null }> {
    const response = await axiosInstance.post("/basket", { plan: data });
    return response.data;
  }
}
