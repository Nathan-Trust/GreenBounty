import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Green_Bounty_Routes } from "@/store/route";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";
import { maskEmail } from "@/utils/text";
import OtpForm from "@/components/shared/OtpForm";
import { VerifyOtpFormSchemaType } from "@/schema/auth";
import { useVerifyEmailOtp } from "@/hooks/auth/useVerifyEmailOtp";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import { useEffect } from "react";

const VerifyOtpPage = () => {
  useTitleUpdater({
    [Green_Bounty_Routes.verifyOtp()]: "GreenBounty | Verify OTP",
  });
  useMetaTagUpdater({
    "/auth/sign-in": [
      { name: "description", content: "This is the login page description." },
      { name: "keywords", content: "login, authentication, user" },
    ],
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { mutate: sendOtp } = useVerifyEmail();

  // Access email from query parameters using useSearchParams
  const email = searchParams.get("email");
  const { mutate: verifyEmailOtp, isSuccess , isPending } = useVerifyEmailOtp(); // Get the mutate function from the custom hook
  // Access email from state passed during navigation
  const fromSignUp = location.state?.fromSignUp;

  useEffect(() => {
    if (!fromSignUp) {
      navigate(Green_Bounty_Routes.signIn, { replace: true });
    }
  }, [fromSignUp, navigate]);

  const onSubmit = async (data: VerifyOtpFormSchemaType) => {
    verifyEmailOtp(data);
    if (isSuccess) {
      // Navigate to the congratulations page if verification is successful
      navigate(Green_Bounty_Routes.congratulations, {
        state: { fromVerifyOtp: true },
      });
    }
  };

  return (
    <Card className="border-none  shadow-none outline-none ">
      <CardHeader className="text-center pt-2">
        <CardTitle className="text-3xl">Email Verification</CardTitle>
        <CardDescription>
          To continue with your sign up process, please input the 5-digit code
          sent to you {maskEmail(email)}. for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OtpForm onSubmit={onSubmit} email={email ?? ""} isPending={isPending} />
      </CardContent>
      <CardFooter className=" w-full ">
        <p className="text-sm text-center mx-auto">
          Haven&apos;t recieved a code{" "}
          <button
            className="text-primary border-none outline-none underline inline ml-1.5"
            onClick={() => sendOtp(email ?? "")}
          >
            Resend{" "}
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default VerifyOtpPage;
