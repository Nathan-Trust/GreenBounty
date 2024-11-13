import Dashboard from "@/app/(dashboard)/dashboard/page";
import Layout from "@/app/(dashboard)/layout";
import SignInPage from "@/app/auth/sign-in/page";
import Home from "@/app/(landing-page)/page";
import ErrorPage from "@/error/page";
import { Green_Bounty_Routes } from "@/store/route";
import { createBrowserRouter } from "react-router-dom";
import LandingPageLayout from "@/app/(landing-page)/layout";
import { SignupAuthLayout } from "@/app/auth/layout";
import SignUpPage from "@/app/auth/sign-up/page";
import VerifyOtpPage from "@/app/auth/verify-otp/page";
import CongratulationsPage from "@/app/auth/congratulations/page";
import ForgotPasswordPage from "@/app/auth/forgot-password/page";
import ResetPasswordForm from "@/app/auth/reset-password/page";
import ChooseBasketForm from "@/app/auth/choose-basket/page";
import ConfirmEmailBeforeResetPassword from "@/app/auth/confirm-reset-email/page";
import Rewards from "@/app/(dashboard)/rewards/page";
import MyProfile from "@/app/(dashboard)/my-profile/page";
import Terms from "@/app/(landing-page)/terms/page";
import AddRecycablesPage from "@/app/(dashboard)/add-recycables/page";

export const router = createBrowserRouter([
  {
    element: <LandingPageLayout />,
    children: [
      {
        path: Green_Bounty_Routes.home,
        element: <Home />,
      },
      {
        path: Green_Bounty_Routes.privacyPolicy,
        element: <Terms />,
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
      {
        path: Green_Bounty_Routes.forgotPassword,
        element: <ForgotPasswordPage />,
      },
      {
        path: Green_Bounty_Routes.resetPassword(),
        element: <ResetPasswordForm />,
      },
      {
        path: Green_Bounty_Routes.confirmResetEmailOtp(),
        element: <ConfirmEmailBeforeResetPassword />,
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
        path: Green_Bounty_Routes.addRecycables,
        element:<AddRecycablesPage/>
      },
      {
        path: Green_Bounty_Routes.rewards,
        element: <Rewards />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
