import OtpForm from "@/components/shared/OtpForm";
import { useVerifyEmailOtp } from "@/hooks/auth/useVerifyEmailOtp";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { VerifyOtpFormSchemaType } from "@/schema/auth";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import { Green_Bounty_Routes } from "@/store/route";
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";
import { useEffect } from "react";

const ConfirmEmailBeforeResetPassword = () => {
  useTitleUpdater({
    [Green_Bounty_Routes.confirmResetEmailOtp()]: "GreenBounty | Verify OTP",
  });
  useMetaTagUpdater({
    [Green_Bounty_Routes.confirmResetEmailOtp()]: [
      {
        name: "description",
        content:
          "Verify the OTP sent to your email to reset your password on GreenBounty.",
      },
      {
        name: "keywords",
        content: "GreenBounty, OTP, verify email, password reset",
      },
    ],
  });
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { mutate: sendOtp } = useVerifyEmail();
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: verifyEmailOtp, isPending } = useVerifyEmailOtp({
    fromSignUp: false,
  }); // Get the mutate function from the custom hook

  const onOtpSubmit = async (data: VerifyOtpFormSchemaType) => {
    verifyEmailOtp(data);
  };

  const fromForgotPassword = location.state?.fromForgotPassword;

  useEffect(() => {
    if (!fromForgotPassword) {
      navigate(Green_Bounty_Routes.signIn, { replace: true });
    }
  }, [fromForgotPassword, navigate]);

  return (
    <Card className="border-none shadow-none outline-none">
      <CardHeader className="text-center pt-2">
        <CardTitle className="text-3xl">Check Your Email</CardTitle>
        <CardDescription>
          A reset link has been sent to your email address. Follow the
          instructions to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OtpForm
          onSubmit={onOtpSubmit}
          email={email ?? ""}
          isPending={isPending}
        />
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

export default ConfirmEmailBeforeResetPassword;
