import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";
import { Green_Bounty_Routes } from "@/store/route";
import SignUpClientPage from "./client";

const SignUpPage = () => {
  // SEO MANAGEMENT
  useTitleUpdater({
    [Green_Bounty_Routes.signUp]: "GreenBounty | Sign Up",
  });

  useMetaTagUpdater({
    [Green_Bounty_Routes.signUp]: [
      {
        name: "description",
        content:
          "Join GreenBounty to participate in eco-friendly activities and sustainability initiatives. Sign up to make a difference today!",
      },
      {
        name: "keywords",
        content:
          "GreenBounty, sign up, registration, eco-friendly, sustainability, environmental initiatives",
      },
    ],
  });

  return <SignUpClientPage />;
};

export default SignUpPage;
