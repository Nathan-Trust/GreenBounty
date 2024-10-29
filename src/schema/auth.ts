import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name cannot exceed 50 characters.",
    }),
  email: z
    .string()
    .email({
      message: "Email Address is not valid.",
    })
    .min(1, {
      message: "Email Address is required.",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, { message: "Password must contain alphabets." })
    .regex(/[A-Z]/, { message: "Password must contain capital letters." })
    .regex(/\d/, { message: "Password must contain numbers (123456789)." })
    .regex(/[@%$]/, {
      message: "Password must contain special characters @%$.",
    }),
  termsAndConditionsAccepted: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions.",
  }),
  referralCode: z.string().optional(), // Make referralCode optional
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type SignUpDataWithoutTerms = Omit<
  SignUpSchemaType,
  "termsAndConditionsAccepted"
>;

export const VerifyOtpFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email Address is not valid.",
    }), // Make email optional
  code: z.string().min(5, {
    message: "Your one-time password must be 5 characters.",
  }),
});

export type VerifyOtpFormSchemaType = z.infer<typeof VerifyOtpFormSchema>;

export const SignInSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email Address is not valid.",
    })
    .min(1, {
      message: "Email Address is required.",
    }),
  rememberMe: z.boolean().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, { message: "Password must contain alphabets." })
    .regex(/[A-Z]/, { message: "Password must contain capital letters." })
    .regex(/\d/, { message: "Password must contain numbers (123456789)." })
    .regex(/[@%$]/, {
      message: "Password must contain special characters @%$.",
    }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>
export type SignInDataWithoutTerms = Omit<SignInSchemaType, "rememberMe">;


export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    });

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>




export const ChangePasswordSchema = z
  .object({
     email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[a-z]/, { message: "Password must contain alphabets." })
      .regex(/[A-Z]/, { message: "Password must contain capital letters." })
      .regex(/\d/, { message: "Password must contain numbers (123456789)." })
      .regex(/[@%$]/, {
        message: "Password must contain special characters @%$.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required." }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords must match",
      });
    }
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>