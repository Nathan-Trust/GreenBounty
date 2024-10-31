import { QueryErrCodes, QueryKeys } from "@/models/query";
import { UserService } from "@/services/user";
import { errorToast, successToast } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";

export const useFetchMe = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QueryKeys.Get_Current_User],
    queryFn: () => UserService.getCurrentUser(),
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


