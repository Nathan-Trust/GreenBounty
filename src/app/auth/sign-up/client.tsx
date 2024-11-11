import { FormFieldComponent } from "@/components/shared/CustomFormField";
import GoogleSignInButton from "@/components/shared/GoogleSigningButton";
import LoadingDots from "@/components/shared/LoadingDots";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignUpSchema, SignUpSchemaType } from "@/schema/auth";
import { AuthService } from "@/services/auth";
import { Green_Bounty_Routes } from "@/store/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const SignUpClientPage = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("refCode");
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
  });
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema), // Use the modified schema
    defaultValues: {
      name: "",
      email: "",
      password: "",
      termsAndConditionsAccepted: false,
      ...(referralCode && { referralCode }),
    },
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: AuthService.signUp,
    mutationKey: ["user-register"],
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { termsAndConditionsAccepted, ...restData } = data; // Destructure to separate terms
    await mutateAsync(restData); // Pass only the necessary data
  navigate(Green_Bounty_Routes.verifyOtp(data.email), {
    state: { fromSignUp: true, email: data.email },
  });
  };

  const togglePasswordVisibility = (field: "password") => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Card className="border-none  shadow-none outline-none ">
      <CardHeader className="text-center pt-2">
        <CardTitle className="text-3xl">Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <GoogleSignInButton />
        <div className="flex w-full items-center gap-3 my-2">
          <Separator className="flex-1" />{" "}
          <span className="text-xs font-medium">OR</span>{" "}
          <Separator className="flex-1" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      aria-label="Name"
                      className="w-full" // Make input full width
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      {...field}
                      aria-label="Email Address"
                      className="w-full" // Make input full width
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormFieldComponent
              name="password"
              label="Password"
              type={isPasswordVisible.password ? "text" : "password"}
              showPasswordStrength={true}
              toggleVisibility={togglePasswordVisibility}
              onBlur={() => form.clearErrors("password")}
            />

            {/* Terms and Conditions */}
            <FormField
              control={form.control}
              name="termsAndConditionsAccepted"
              render={({ field }) => (
                <FormItem className=" flex space-x-3 mt-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      className="mt-2"
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <p className="leading-none text-sm text-[#00051D74] ">
                    I agree to GreenBounty&apos;s Terms and Privacy Policy
                  </p>
                </FormItem>
              )}
            />
            <Button
              className="w-full flex items-center justify-center"
              disabled={!form.getValues().termsAndConditionsAccepted}
            >
              {isPending ? <LoadingDots /> : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className=" w-full ">
        <p className="text-sm text-center mx-auto">
          Already have an account?{" "}
          <Link
            to={Green_Bounty_Routes.signIn}
            className="text-primary inline ml-1.5"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpClientPage;
