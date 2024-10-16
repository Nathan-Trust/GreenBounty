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

export const FormFieldComponent = ({
  name,
  label,
  type = "text",
  showPasswordStrength = false, // New prop to control password strength visibility
  focusedField,
  onFocus,
  onBlur,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  showPasswordStrength?: boolean; // New prop to control password strength visibility
  focusedField: string | null;
  onFocus: (fieldName: string) => void;
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
        <FormItem className={`relative ${className}`}>
          <FormControl>
            <Input
              placeholder=" "
              {...field}
              type={type}
              className="peer placeholder-transparent bg-lightGray_two h-[45px]  focus-visible:ring-0  text-xs font-medium focus-visible:ring-offset-0 focus:bg-lightGray_two hover:bg-lightGray_two border-none outline-none  "
              onFocus={() => onFocus(name)}
              onBlur={onBlur}
            />
          </FormControl>
          <FormLabel
            className={`absolute left-2 transition-all text-[#9f9fa0] text-xs duration-200 ${
              focusedField === name || field.value
                ? "-top-2 left-2"
                : "top-1 left-3"
            }`}
          >
            {label}
          </FormLabel>
          <FormMessage className="text-sm font-medium" />
          {label === "Password" && showPasswordStrength && (
            <div className="mt-3 flex flex-col  items-center space-x-1">
              <div className="flex w-full gap-2">
                {["a-z", "A-Z", "0-9", "!@#$%^&*()"].map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-[25%] rounded-full ${
                      passwordStrength > index ? "bg-success" : "bg-gray-300"
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
