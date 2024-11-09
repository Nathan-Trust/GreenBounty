import { useMutation } from "@tanstack/react-query";
import { MyProfileFormSchemaType } from "@/schema/myprofile";
import { successToast, errorToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest";
import { User, UserService } from "@/services/user";
import { useStore } from "@/store/user";

export const useUpdateUser = () => {
  const { saveUserData } = useStore();

  return useMutation<User, unknown, MyProfileFormSchemaType>({
    mutationFn: async ({ name, photo }) => {
      const formData = new FormData();

      // Append name if it exists
      if (name) {
        formData.append("name", name);
      }

      // Append photo if it exists
      if (photo) {
        formData.append("photo", photo);
      }

      const updatedUser = await UserService.updateUser(formData);
      saveUserData(updatedUser);
      return updatedUser;
    },
    onSuccess: () => {
      successToast({
        title: "Profile Updated",
        message: "Your profile has been successfully updated.",
      });
    },
    onError: (error: unknown) => {
      errorToast({
        title: "Update Error",
        message:
          (error as ApiError)?.response?.data?.message ??
          "An error occurred while updating your profile. Please try again.",
      });
      throw error;
    },
  });
};
