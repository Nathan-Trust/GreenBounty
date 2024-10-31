import { QueryErrCodes, QueryKeys } from "@/models/query";
import { decrypt } from "@/services/encryption";
import { UserService } from "@/services/user";
import { useStore } from "@/store/user";
import { errorToast, successToast } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchMe = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QueryKeys.Get_Current_User],
    queryFn: () => UserService.getCurrentUser(),
    meta: {
      errCode: QueryErrCodes.GetCurrentUser,
    },
  });
  const { saveUserData } = useStore();
  const token = Cookies.get("token");
  const user = token ? decrypt(token) : null;

  if (isSuccess && data) {
    const mergedData = { ...data, accessToken: user };
    saveUserData(mergedData);

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
