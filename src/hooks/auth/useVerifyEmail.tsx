import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthService } from "@/services/auth"; // Ensure the correct import path
import { errorToast, successToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest"; // Assuming you have an ApiError model for error handling

// Custom hook for email verification
export const useVerifyEmail = (): UseMutationResult<void, unknown, string> => {
  return useMutation<void, unknown, string>({
    mutationFn: async (email) => {
      await AuthService.verifyEmail(email);
    },
    onSuccess: () => {
      successToast({
        title: "Verification Email Sent",
        message: "An OTP has been sent to your email. Please check your inbox.",
      });
    },
    onError: (error: unknown) => {
      errorToast({
        title: "Verification Error",
        message:
          (error as ApiError)?.response?.data?.message ??
          "An error occurred while sending the verification email. Please try again.",
      });
    },
  });
};
