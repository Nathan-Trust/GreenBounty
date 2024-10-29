import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { VerifyOtpFormSchema, VerifyOtpFormSchemaType } from "@/schema/auth";

export const OtpFormSchema = z.object({
  code: z.string().length(5, "Code must be 5 characters long"),
  // Add any other necessary fields if needed
});

type OtpFormProps = {
  onSubmit: (data: VerifyOtpFormSchemaType) => void;
  email?: string; // Optional email prop for masking
};

const OtpForm = ({ onSubmit, email }: OtpFormProps) => {
  const form = useForm<z.infer<typeof VerifyOtpFormSchema>>({
    resolver: zodResolver(VerifyOtpFormSchema),
    defaultValues: {
      code: "",
      ...(email ? { email } : {}), // Conditional default values
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col space-y-8 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <InputOTP maxLength={5} {...field}>
                  <InputOTPGroup className="flex gap-4">
                    {[...Array(5)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className={`border rounded outline-none ring-0 focus:ring-0`}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default OtpForm;
