import { MyContext } from "@/context";
import { useContext } from "react";
import { formatFullName, getInitials } from "../text";
import { User } from "@/services/user";

export class Constants {
    // static isDev = process.env.NEXT_PUBLIC_ENV === "dev";
    static readonly  defaultAvatar =
      "https://firebasestorage.googleapis.com/v0/b/nestuge.appspot.com/o/default_avatar.png?alt=media&token=a49ee4f4-8138-4773-9abf-c334f5e54776";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static readonly isDev: any;
  }
  

  export const useProviderContext = () => {
    return useContext(MyContext);
  };
  


/**
 * Get initials and full name from a user object.
 * @param user - The user object containing first and last names.
 * @returns An object containing initials and full name.
 */
export const getUserDetails = (user: User) => {
  const initials = user ? getInitials(user?.firstname, user?.lastname) : "";
  const fullName = user ? formatFullName(user?.firstname, user?.lastname) : "";
  return { initials, fullName };
};