import SignInForm from "./client";
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";
import { Green_Bounty_Routes } from "@/store/route";

const SignInPage = () => {
  // SEO MANAGEMENT
  useTitleUpdater({ [Green_Bounty_Routes.signIn]: "GreenBounty | Login" });
  useMetaTagUpdater({
    [Green_Bounty_Routes.signIn]: [
      { name: "description", content: "This is the login page description." },
      { name: "keywords", content: "login, authentication, user" },
    ],
  });

  return <SignInForm />;
};

export default SignInPage;
