import { MyProfilePageType } from "@/models/myprofile";

export class Green_Bounty_Routes {
  //landing-page
  static readonly home = "/";
  static readonly about = "/about";
  static readonly privacyPolicy = "/privacy-policy"; 
  // Auth
  static readonly signIn = "/auth/sign-in";
  static readonly signUp = "/auth/sign-up";
  static readonly verifyOtp = (email?: string) =>
    `/auth/verify-otp${email ? `?email=${encodeURIComponent(email)}` : ""}`;
  static readonly congratulations = "/auth/congratulations";
  static readonly forgotPassword = "/auth/forgot-password";
  static readonly confirmResetEmailOtp = (email?: string) =>
    `/auth/confirm-reset-email-otp${
      email ? `?email=${encodeURIComponent(email)}` : ""
    }`;
  static readonly resetPassword = (email?: string) =>
    `/auth/reset-password${email ? `?email=${encodeURIComponent(email)}` : ""}`;
  static readonly chooseBasket = "/auth/choose-basket";

  // Dashboard
  static readonly dashboard = "/dashboard";
  static readonly rewards = "/rewards";
  static readonly myProfile = (tab: MyProfilePageType) => `/profile?tab=${tab}`;
  static readonly addRecycables = "/add-recycables"
  

  //settings
  static readonly settings = "/settings";
}
