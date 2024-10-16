import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormFieldComponent } from "@/components/shared/CustomFormField";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import LoadingDots from "@/components/shared/LoadingDots";

const SignUpForm = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { mutate: login, isPending } = useLogin();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    login(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: (error) => {
          // eslint-disable-next-line no-console
          console.error("Login failed:", error); // Handle error if needed
        },
      }
    );
  }

  const handleFocus = (fieldName: string) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" h-fit">
        <div className="w-full flex flex-col gap-4">
          <FormFieldComponent
            name="email"
            label="Email"
            focusedField={focusedField}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full"
          />
          <FormFieldComponent
            name="password"
            label="Password"
            type="password"
            focusedField={focusedField}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full"
            showPasswordStrength={false}
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="w-full mt-8 disabled:opacity-100"
        >
          {isPending ? <LoadingDots /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
