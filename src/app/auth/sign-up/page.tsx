import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";
import { Green_Bounty_Routes } from "@/store/route";
import SignUpClientPage from "./client";

const SignUpPage = () => {
  // SEO MANAGEMENT
  useTitleUpdater({ [Green_Bounty_Routes.signUp]: "GreenBounty | Signup" });
  useMetaTagUpdater({
    "/auth/sign-in": [
      { name: "description", content: "This is the login page description." },
      { name: "keywords", content: "login, authentication, user" },
    ],
  });
  return <SignUpClientPage />;
};

export default SignUpPage;
