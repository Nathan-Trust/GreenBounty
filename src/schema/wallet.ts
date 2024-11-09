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
