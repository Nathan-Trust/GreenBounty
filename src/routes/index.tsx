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

export const router = createBrowserRouter([
  {
    element: <LandingPageLayout />,
    children: [
      {
        path: Green_Bounty_Routes.home,
        element: <Home />,
      }, {
        path: Green_Bounty_Routes.about,
        element: <AboutPage/>
      }
    ]
  },
  {
    path: Green_Bounty_Routes.signIn,
    element: <SignInPage />,
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
