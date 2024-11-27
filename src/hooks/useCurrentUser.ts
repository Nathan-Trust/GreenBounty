import { QueryErrCodes, QueryKeys } from "@/models/query";
import { UserService } from "@/services/user";
import { useStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useFetchMe = () => {
  const { saveUserData } = useStore();
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: [QueryKeys.Get_Current_User],
    queryFn: () => UserService.getCurrentUser(),
    meta: {
      errCode: QueryErrCodes.GetCurrentUser,
    },
    refetchInterval: 5000, // Refetch every hour
  });

  if (isSuccess) {
    saveUserData(data);
  }

  return {
    data,
    isLoading,
    refetch
  };
};
