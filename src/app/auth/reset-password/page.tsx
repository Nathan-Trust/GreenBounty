import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChangePasswordSchema, ChangePasswordSchemaType } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import useResetPassword from "@/hooks/auth/useResetPassword";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Green_Bounty_Routes } from "@/store/route";
import LoadingDots from "@/components/shared/LoadingDots";
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";

const ResetPasswordForm = () => {
  useTitleUpdater({
    [Green_Bounty_Routes.resetPassword()]: "GreenBounty | Reset Password",
  });

  useMetaTagUpdater({
    [Green_Bounty_Routes.resetPassword()]: [
      {
        name: "description",
        content:
          "Reset your GreenBounty account password to regain access. Please enter your new password to complete the reset process.",
      },
      {
        name: "keywords",
        content:
          "GreenBounty, reset password, account recovery, password reset, security",
      },
    ],
  });

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fromForgotPassword = location.state?.fromForgotPassword;
  // Access email from query parameters using useSearchParams
  const email = searchParams.get("email");
  const { handleResetPassword , loading } = useResetPassword();
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      email: email ?? "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  
  useEffect(() => {
    if (!fromForgotPassword) {
      navigate(Green_Bounty_Routes.signIn, { replace: true });
    }
  }, [fromForgotPassword, navigate]);

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    // Implement your password reset logic here
    handleResetPassword(data);
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Card className="border-none shadow-none outline-none">
      <CardHeader className="text-center pt-2">
        <CardTitle className="text-3xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your details to sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col w-full space-y-6">
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={
                            isPasswordVisible.password ? "text" : "password"
                          }
                          placeholder="Enter Your Password"
                          {...field}
                          aria-label="Enter Password"
                          className="w-full pr-10 "
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("password")}
                          className="absolute inset-y-0 right-2 flex items-center"
                        >
                          {isPasswordVisible.password ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={
                            isPasswordVisible.confirmPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Confirm Your Password"
                          {...field}
                          aria-label="Confirm Password"
                          className="w-full pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                          className="absolute inset-y-0 right-2 flex items-center"
                        >
                          {isPasswordVisible.confirmPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <LoadingDots /> : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
