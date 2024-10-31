import LoadingDots from "@/components/shared/LoadingDots";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema } from "@/schema/auth";
import { AuthService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { successToast, errorToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest";
import { Green_Bounty_Routes } from "@/store/route";
import { useNavigate } from "react-router-dom"; // Example for another background image
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useTitleUpdater({
    [Green_Bounty_Routes.forgotPassword]: "GreenBounty | Forgot Password",
  });

  useMetaTagUpdater({
    [Green_Bounty_Routes.forgotPassword]: [
      {
        name: "description",
        content:
          "Reset your GreenBounty password by entering the email linked to your account. We'll send you a verification code to proceed.",
      },
      {
        name: "keywords",
        content:
          "GreenBounty, forgot password, password recovery, account help, password reset",
      },
    ],
  });


  async function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    setLoading(true);
    try {
      // Call the forgotPassword function from AuthService
      await AuthService.forgotPassword(values);
      navigate(Green_Bounty_Routes.confirmResetEmailOtp(values.email), {
        state: { fromForgotPassword: true },
      });
      successToast({
        title: "Password Reset Email Sent",
        message: "Please check your email to reset your password.",
      });
    } catch (error: unknown) {
      errorToast({
        title: "Password Reset Failed",
        message:
          (error as ApiError)?.response?.data?.message ??
          "An error occurred while sending the reset email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-none shadow-none outline-none">
      <CardHeader className="text-center pt-2">
        <CardTitle className="text-3xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter the email address linked to your account and we will send you a
          5-digit code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl className="relative">
                    <Input
                      type="email"
                      placeholder="greenbounty@gmail.com"
                      {...field}
                      aria-label="Enter Email"
                      className={`w-full`}
                    />
                  </FormControl>
                  <div className="flex gap-1.5 items-center">
                    <FormMessage />
                  </div>
                  <FormDescription>
                    Please enter the email you created your account with.
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex flex-col w-full">
              <Button
                type="submit"
                className="w-full flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <LoadingDots /> : "Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordPage;
