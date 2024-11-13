import { z } from "zod";

export const JoinWaitlistSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email Address is not valid.",
    })
    .min(1, {
      message: "Email Address is required.",
    }),
});

export type JoinWaitlistSchemaType = z.infer<typeof JoinWaitlistSchema>;
