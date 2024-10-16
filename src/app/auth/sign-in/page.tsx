import { CustomAuthCardHeader } from "@/components/shared/CustomCardHeader";
import SignUpForm from "./client";
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";
import { Green_Bounty_Routes } from "@/store/route";

const SignInPage = () => {
  // SEO MANAGEMENT
  useTitleUpdater({ [Green_Bounty_Routes.signIn]: "Onsite | Login" });
  useMetaTagUpdater({
    "/auth/sign-in": [
      { name: "description", content: "This is the login page description." },
      { name: "keywords", content: "login, authentication, user" },
    ],
  });
  return (
    <div className="h-screen flex border border-green-400">
      <div className="w-full lg:w-1/2 bg-white h-full flex flex-col items-center justify-center">
        <div className="w-4/5 lg:w-1/2">
          <CustomAuthCardHeader
            title="Sign In"
            content="Log into your account"
            className="text-start self-start mb-7"
          />
          <SignUpForm />
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-end w-1/2 bg-[#f1f4f6] h-full">
        <div className="w-[60%] h-[75%] bg-white rounded-tl-xl rounded-bl-xl"></div>
      </div>
    </div>
  );
};

export default SignInPage;
