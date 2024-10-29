import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthService } from "@/services/auth"; // Ensure the correct import path
import { errorToast, successToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest"; // Assuming you have an ApiError model for error handling
import { VerifyOtpFormSchemaType } from "@/schema/auth"; // Adjust this as necessary

// Custom hook for email OTP verification
export const useVerifyEmailOtp = (): UseMutationResult<
  { success: boolean; message: string },
  unknown,
  VerifyOtpFormSchemaType // Ensure this includes both email and otpCode
> => {
  return useMutation<
    { success: boolean; message: string },
    unknown,
    VerifyOtpFormSchemaType
  >({
    mutationFn: async (data) => {
      const response = await AuthService.verifyEmailOtp(data);
      return response; // Return the response object
    },
    onSuccess: (data) => {
      successToast({
        title: "Email Verified",
        message: data.message || "Your email has been verified successfully.",
      });
    },
    onError: (error: unknown) => {
      // Handle error scenario
      errorToast({
        title: "Verification Error",
        message:
          (error as ApiError)?.response?.data?.message ??
          "An error occurred while verifying the OTP. Please try again.",
      });
    },
  });
};
