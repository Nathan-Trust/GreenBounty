import CompaniesAccountPage from "@/app/(dashboard)/accounts/companies/page";
import User from "@/app/(dashboard)/accounts/users/[user_id]/page";
import UsersAccountPage from "@/app/(dashboard)/accounts/users/page";
import Dashboard from "@/app/(dashboard)/dashboard/page";
import Layout from "@/app/(dashboard)/layout";
import MessagingPage from "@/app/(dashboard)/messaging/page";
import SingleProjectPage from "@/app/(dashboard)/projects/[projectId]/page";
import ProjectsPage from "@/app/(dashboard)/projects/page";
import SettingsPage from "@/app/(dashboard)/settings/page";
import SignInPage from "@/app/auth/sign-in/page";
import Home from "@/app/(landing-page)/page";
import ErrorPage from "@/error/page";
import { Green_Bounty_Routes } from "@/store/route";
import { createBrowserRouter } from "react-router-dom";
import LandingPageLayout from "@/app/(landing-page)/layout";
import AboutPage from "@/app/(landing-page)/about/page";
import { SignupAuthLayout } from "@/app/auth/layout";
import { ForgotPasswordLayout } from "@/app/auth/layout";
import SignUpPage from "@/app/auth/sign-up/page";
import VerifyOtpPage from "@/app/auth/verify-otp/page";
import CongratulationsPage from "@/app/auth/congratulations/page";
import ForgotPasswordPage from "@/app/auth/forgot-password/page";
import ResetPasswordForm from "@/app/auth/reset-password/page";
import ChooseBasketForm from "@/app/auth/choose-basket/page";

export const router = createBrowserRouter([
  {
    element: <LandingPageLayout />,
    children: [
      {
        path: Green_Bounty_Routes.home,
        element: <Home />,
      },
      {
        path: Green_Bounty_Routes.about,
        element: <AboutPage />,
      },
    ],
  },
  {
    element: <SignupAuthLayout />,
    children: [
      {
        path: Green_Bounty_Routes.signUp,
        element: <SignUpPage />,
      },
      {
        path: Green_Bounty_Routes.verifyOtp(), // Add VerifyOtpPage to SignupAuthLayout
        element: <VerifyOtpPage />,
      },
      {
        path: Green_Bounty_Routes.congratulations,
        element: <CongratulationsPage />,
      },
      {
        path: Green_Bounty_Routes.signIn,
        element: <SignInPage />,
      },
    ],
  },
  {
    element: <ForgotPasswordLayout />,
    children: [
      {
        path: Green_Bounty_Routes.forgotPassword,
        element: <ForgotPasswordPage />,
      },
      {
        path: Green_Bounty_Routes.resetPassword(),
        element: <ResetPasswordForm />,
      },
    ],
  },
  {
    path: Green_Bounty_Routes.chooseBasket,
    element: <ChooseBasketForm />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: Green_Bounty_Routes.dashboard,
        element: <Dashboard />,
      },
      {
        path: Green_Bounty_Routes.users,
        element: <UsersAccountPage />,
      },
      {
        path: Green_Bounty_Routes.user,
        element: <User />,
      },
      {
        path: Green_Bounty_Routes.companies,
        element: <CompaniesAccountPage />,
      },
      {
        path: Green_Bounty_Routes.projects,
        element: <ProjectsPage />,
      },
      {
        path: `${Green_Bounty_Routes.projects}/:projectId`,
        element: <SingleProjectPage />,
      },
      {
        path: Green_Bounty_Routes.messaging,
        element: <MessagingPage />,
      },
      {
        path: Green_Bounty_Routes.settings,
        element: <SettingsPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
