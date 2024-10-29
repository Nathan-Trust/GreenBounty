import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export const FormFieldComponent = ({
  name,
  label,
  type = "text",
  showPasswordStrength = false, // New prop to control password strength visibility
  toggleVisibility,
  onBlur,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  showPasswordStrength?: boolean;
  toggleVisibility: (field: "password") => void;
  onBlur: () => void;
  className?: string;
}) => {
  const { control, watch } = useFormContext();
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const passwordValue = watch(name);

  useEffect(() => {
    if (label === "Password" && showPasswordStrength) {
      const lowerCase = /[a-z]/.test(passwordValue);
      const upperCase = /[A-Z]/.test(passwordValue);
      const number = /[0-9]/.test(passwordValue);
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

      const strength = [lowerCase, upperCase, number, specialChar].filter(
        Boolean
      ).length;
      setPasswordStrength(strength);
    }
  }, [passwordValue, type, showPasswordStrength]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={` ${className}`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder=" "
                {...field}
                type={type}
                className="w-full"
                onBlur={onBlur}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("password")}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {type == "text" ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </FormControl>
          <FormMessage className="text-sm font-medium" />
          {label === "Password" && showPasswordStrength && (
            <div className="mt-5">
              <div className="flex w-full gap-2">
                {["a-z", "A-Z", "0-9", "!@#$%^&*()"].map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-[25%] rounded-full ${
                      passwordStrength > index ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs mt-2 text-lightGray_three font-medium">
                Required: 1 lowercase letter, 1 uppercase letter, 1 number or
                special character
              </div>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};
