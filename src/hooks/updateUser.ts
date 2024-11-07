import { useMutation } from "@tanstack/react-query";
import { MyProfileFormSchemaType } from "@/schema/myprofile";
import { successToast, errorToast } from "@/utils/toast"; // assuming these are defined in your utils
import { ApiError } from "@/models/serviceRequest";
import { User, UserService } from "@/services/user";
import { useStore } from "@/store/user";

export const useUpdateUser = () => {
  const { saveUserData } = useStore();
  return useMutation<User, unknown, MyProfileFormSchemaType>({
    mutationFn: async ({ name, photo }) => {
      const updatedUser = await UserService.updateUser({ name, photo });
      saveUserData(updatedUser);
      return updatedUser;
    },
    onSuccess: () => {
      successToast({
        title: "Profile Updated",
        message: "Your profile has been successfully updated.",
      });
      // Optionally, you can add any state updates here
    },
    onError: (error: unknown) => {
      errorToast({
        title: "Update Error",
        message:
          (error as ApiError)?.response?.data?.message ??
          "An error occurred while updating your profile. Please try again.",
      });
      throw error; // re-throw the error to handle it in the component if needed
    },
  });
};
