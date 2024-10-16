import { QueryKeys } from "@/models/query";
import { ApiError } from "@/models/serviceRequest";
import { AuthService, User } from "@/services/auth";
import { Green_Bounty_Routes } from "@/store/route";
import { errorToast, successToast } from "@/utils/toast";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// AUTH LOGIN
export const useLogin = (): UseMutationResult<
  User,
  unknown,
  { email: string; password: string }
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<User, unknown, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const userData = await AuthService.login(email, password);
      return userData; // Ensure this is of type User
    },
    onSuccess: () => {
      successToast({
        title: "Login Successful",
        message: "You have successfully logged in. Welcome back!",
      });
      navigate(Green_Bounty_Routes.dashboard);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Current_User] });
    },
    onError: (error: unknown) => {
      errorToast({
        title: "Login Error",
        message:
          (error as ApiError)?.response?.data?.message ??
          "An error occurred while logging in. Please try again.",
      });
    },
  });
};
