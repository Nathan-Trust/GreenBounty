import { z } from "zod";

export const WithdrawFundsFormSchema = z.object({
  amount: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Amount must be a positive number.",
    }),
  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters long.",
    })
    .optional(),
});

export type WithdrawFundsFormSchemaType = z.infer<typeof WithdrawFundsFormSchema>

export const AddWithdrawalAccountFormSchema = z.object({
  accountName: z.string().min(5, {
    message: "Account name must be at least 5 characters long.",
  }),
  accountNumber: z
    .string()
    .min(5, { message: "Account number must be at least 5 characters long." })
    .max(11, { message: "Account number must be at most 11 characters long." })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Account number must contain only numbers.",
    }),
  bankName: z.string().min(5, {
    message: "Bank name must be at least 5 characters long.",
  }),
});

export type AddWithdrawalAccountFormSchemaType = z.infer<typeof AddWithdrawalAccountFormSchema>



export const WithdrawFormSchema = z.object({
  // Step 1 fields
  account: z.string().min(1, "Card selection is required"),

  // Step 2 fields
  amount: z
    .number()
    .positive("Amount must be a positive number")
    .min(1, { message: "Minimum amount should be 1" }),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description should not exceed 500 characters"),
});


export type WithdrawFormSchemaType = z.infer<
  typeof WithdrawFormSchema
>;
