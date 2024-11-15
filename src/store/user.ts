/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import Cookies from "js-cookie";
import { decrypt, encrypt } from "@/services/encryption";
import { logger } from "@/utils/logger";
import { User } from "@/services/user";

interface UserState {
  userData: User | null;
  preSaveUserData: any | null;
  token: string | null;
  saveUserToken: (token: string) => void;
  saveUserData: (data: any) => void;
  rememberUserDetails: (details: any) => void;
  removeRememberUserDetails: () => void;
  removeUserData: () => void;
  loadUserData: () => void;
}
const currentDate = new Date();
const newDate = new Date(currentDate);
newDate.setHours(currentDate.getHours() + 24);

// Function to save data in cookies
export const saveToCookies = (key: string, data: any): void => {
  Cookies.set(key, encrypt(JSON.stringify(data)), {
    httpOnly: false,
    expires: newDate,
    path: "/",
    secure: true,
    sameSite: "strict",
  }); // cookie expires in 7 days
};

// Function to get data from cookies
export const getFromCookies = (key: string): any | null => {
  const cookieData = decrypt(Cookies.get(key));
  if (cookieData) {
    if (typeof cookieData === "string") {
      try {
        logger("cookieData", cookieData);
        return JSON.parse(cookieData);
      } catch (error) {
        logger("Invalid JSON string:", error);
        return cookieData;
      }
    } else {
      logger(key, cookieData);
      return cookieData;
      // Return the object or null if empty}
    }
  }
  return null;
};

// Function to remove data from cookies
const removeFromCookies = (key: string): void => {
  Cookies.remove(key);
};

// Zustand store using cookies
export const useStore = create<UserState>(
  (
    set: (arg0: { userData?: any; token?: any; preSaveUserData?: any }) => void
  ) => ({
    // Sample state data
    userData: getFromCookies("userData") || null,
    preSaveUserData: getFromCookies("rememberMe") || null,
    token: getFromCookies("token") || null,

    // Action to save data to cookies and update Zustand state
    saveUserData: (data: any) => {
      saveToCookies("userData", data);
      set({ userData: data });
    },
    // Action to save token to cookies and update Zustand state
    saveUserToken: (data: any) => {
      saveToCookies("token", data);
      set({ token: data });
    },

    // Action to save token to cookies and update Zustand state
    rememberUserDetails: (data: any) => {
      saveToCookies("rememberMe", data);
      set({ preSaveUserData: data });
    },

    // Action to remove data from cookies and reset Zustand state
    removeRememberUserDetails: () => {
      removeFromCookies("rememberMe");
      set({ preSaveUserData: null });
    },
    removeUserData: () => {
      removeFromCookies("userData");
      set({ userData: null });
    },

    // Action to load data from cookies (optional, for initial loading if needed)
    loadUserData: () => {
      const data = getFromCookies("userData");
      set({ userData: data });
    },
  })
);
