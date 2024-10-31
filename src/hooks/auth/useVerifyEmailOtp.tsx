import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthService } from "@/services/auth"; // Ensure the correct import path
import { errorToast, successToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest"; // Assuming you have an ApiError model for error handling
import { VerifyOtpFormSchemaType } from "@/schema/auth"; // Adjust this as necessary
import { useNavigate, useSearchParams } from "react-router-dom";
import { Green_Bounty_Routes } from "@/store/route"; // Adjust import path as needed

// Custom hook for email OTP verification
export const useVerifyEmailOtp = ({
  fromSignUp = false,
}): UseMutationResult<
  { success: boolean; message: string },
  unknown,
  VerifyOtpFormSchemaType
> => {
  const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 // Access email from query parameters using useSearchParams
 const email = searchParams.get("email");
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
      // Navigate to the congratulations page upon successful verification
      if (fromSignUp) {
        navigate(Green_Bounty_Routes.congratulations, {
          state: { fromVerifyOtp: true },
        });
      } else {
         navigate(Green_Bounty_Routes.resetPassword(email!), {
           state: { fromForgotPassword: true },
         });
      }
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
