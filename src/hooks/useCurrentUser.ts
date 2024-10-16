import { QueryErrCodes, QueryKeys } from "@/models/query";
import { UserService } from "@/services/user";
import { errorToast, successToast } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";

const getUserId = () => {
  const userData = localStorage.getItem("initial_user_response");
  const user =
    userData && userData !== "undefined" ? JSON.parse(userData) : null;
  return user ? user.user_id : null;
};

export const useFetchMe = () => {
  const userId = getUserId();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QueryKeys.Get_Current_User, userId],
    enabled: !!userId,
    queryFn: () => UserService.getCurrentUser(userId),
    meta: {
      errCode: QueryErrCodes.GetCurrentUser,
    },
  });

  if (isSuccess && data) {
    successToast({
      title: "User Data Loaded",
      message: "Your profile data has been successfully loaded.",
    });
  }

  // Handle error
  if (isError) {
    errorToast({
      title: "Fetch Error",
      message: "An error occurred while fetching user data. Please try again.",
    });
  }

  return {
    data,
    isLoading,
  };
};

// You may want to keep this function if you have other uses for it
export const getUser = () => {
  const userData = localStorage.getItem("user");
  return userData && userData !== "undefined" ? JSON.parse(userData) : null;
};
