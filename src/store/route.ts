import { ProjectTabItems } from "./single-project";

export class Green_Bounty_Routes {
  //landing-page
  static readonly home = "/";
  static readonly about = "/about";
  // Auth
  static readonly signIn = "/auth/sign-in";
  static readonly signUp = "/auth/sign-up";
  static readonly verifyOtp = (email?: string) =>
    `/auth/verify-otp${email ? `?email=${encodeURIComponent(email)}` : ""}`;
  static readonly congratulations = "/auth/congratulations";
  static readonly forgotPassword = "/auth/forgot-password";
  static readonly resetPassword = (email?: string) =>
    `/auth/reset-password${email ? `?email=${encodeURIComponent(email)}` : ""}`;
  // Dashboard
  static readonly dashboard = "/dashboard";

  //Accounts
  static readonly accounts = "/accounts";
  static readonly users = "/accounts/users";
  static readonly user = "/accounts/users/:_id";
  static readonly companies = "/accounts/companies";

  //Projects
  static readonly projects = "/projects";
  static readonly project = (
    projectId: number | string,
    tab?: ProjectTabItems
  ) => `/projects/${projectId}${tab ? `?tab=${tab}` : `?tab=logs`}`;

  //messaging
  static readonly messaging = "/messaging";
  //settings
  static readonly settings = "/settings";
}
