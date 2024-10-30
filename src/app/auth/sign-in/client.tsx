import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInSchemaType } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import LoadingDots from "@/components/shared/LoadingDots";
import { Green_Bounty_Routes } from "@/store/route";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/store/user";
import GoogleSignInButton from "@/components/shared/GoogleSigningButton";
import { Separator } from "@/components/ui/separator";
import { ApiError } from "@/models/serviceRequest";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";

const SignUpForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutateAsync: login, isPending } = useLogin();
  const { mutate: sendOtp } = useVerifyEmail(); // Instantiate the useVerifyEmail hook

  const navigate = useNavigate();
  const {
    saveUserToken,
    saveUserData,
    rememberUserDetails,
    preSaveUserData,
    removeRememberUserDetails,
  } = useStore();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    const storedData = preSaveUserData;

    if (storedData) {
      form.reset({
        email: storedData.email || "",
        rememberMe: storedData.rememberMe || false,
      });
    }
  }, [preSaveUserData]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
  };

  async function onSubmit(values: SignInSchemaType) {
    const { rememberMe, ...dataWithoutTerms } = values;

    try {
      const res = await login(dataWithoutTerms);

      if (res) {
        saveUserData(res);
        saveUserToken(res.accessToken);
      }

      if (rememberMe) {
        rememberUserDetails(dataWithoutTerms);
      }

      if (res.role == null) {
        navigate(Green_Bounty_Routes.chooseBasket, {
          state: { fromSignIn: true },
        });
      }
    } catch (error) {
      const errorMessage = (error as ApiError)?.response?.data?.message;
      if (errorMessage === "kindly verify your email to login") {
        // Send OTP before navigating to verification page
        sendOtp(values.email);
        navigate(Green_Bounty_Routes.verifyOtp(values.email), {
          state: { fromSignUp: true, email: values.email },
        });
      }
    }
  }

  return (
    <Card className="border-none shadow-none outline-none">
      <CardHeader className="text-center pt-2">
        <CardTitle className="text-3xl">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <GoogleSignInButton />
        <div className="flex w-full items-center gap-3 my-2">
          <Separator className="flex-1" />{" "}
          <span className="text-xs font-medium">OR</span>{" "}
          <Separator className="flex-1" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      aria-label="mail"
                      className="w-full" // Make input full width
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col w-full">
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl className="relative">
                        <div className="relative">
                          <Input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Enter Your Password"
                            {...field}
                            aria-label="Enter Password"
                            className="w-full pr-10"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-2 flex items-center"
                          >
                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="w-full flex justify-between mt-4 items-center text-[#00051D74] ">
                {/* Terms and Conditions */}
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex space-x-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          className="mt-2"
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (!checked) {
                              removeRememberUserDetails();
                            }
                          }}
                        />
                      </FormControl>
                      <p className="leading-none text-sm ">
                        Remember Password{" "}
                      </p>
                    </FormItem>
                  )}
                />
                <Link
                  to={Green_Bounty_Routes.forgotPassword}
                  className="text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button className="w-full" disabled={isPending}>
              {isPending ? <LoadingDots /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="w-full ">
        <p className="text-sm text-center mx-auto">
          Don&apos;t have an account ?
          <Link
            to={Green_Bounty_Routes.signUp}
            className="text-primary inline ml-1.5"
          >
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
