import { AuthService } from "@/services/auth";
import { errorToast, successToast } from "@/utils/toast";
import { useState } from "react";
import { ChangePasswordSchemaType } from "@/schema/auth"; // Import your schema type
import { ApiError } from "@/models/serviceRequest"; // Assuming you have an ApiError model for error handling

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ message: string } | null>(null);

  const handleResetPassword = async (data: ChangePasswordSchemaType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthService.resetPassword(data); // Call resetPassword API
      setData({ message: response.message });
      successToast({
        title: "Verification Email Sent",
        message: "An OTP has been sent to your email. Please check your inbox.",
      }); // Extract the message from the response
      return response;
    } catch (err: unknown) {
      errorToast({
        title: "Verification Error",
        message:
          (err as ApiError)?.response?.data?.message ??
          "An error occurred while sending the verification email. Please try again.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleResetPassword, loading, error, data };
};

export default useResetPassword;
