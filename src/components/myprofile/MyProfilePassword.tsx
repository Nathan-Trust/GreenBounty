import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useStore } from "@/store/user";
import useResetPassword from "@/hooks/auth/useResetPassword";
import { ChangePasswordSchema, ChangePasswordSchemaType } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { z } from "zod";
import LoadingDots from "../shared/LoadingDots";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const MyProfilePassword = () => {
  const { userData } = useStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const { handleResetPassword, loading } = useResetPassword(false);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      email: userData?.email ?? "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    handleResetPassword(data);
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleCancel = () => {
    form.reset({
      email: userData?.email ?? "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="p-0 pb-6 md:p-6">
          <CardTitle>Password Information</CardTitle>
          <CardDescription>Manage your password settings</CardDescription>
        </CardHeader>
        <CardContent className="p-0  md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col lg:w-1/2 space-y-6">
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
                            placeholder="New Password"
                            {...field}
                            aria-label="New Password"
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
                            placeholder="Confirm  Password"
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
              <div className="lg:w-1/2 flex gap-3">
                <Button
                  className=" bg-[#D4D4D4] text-white hover:bg-[#D4D4D4] w-1/2"
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel{" "}
                </Button>
                <Button className="flex-1" type="submit" disabled={loading}>
                  {loading ? <LoadingDots /> : "Reset Password"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfilePassword;
