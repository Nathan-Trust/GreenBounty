import { z } from "zod";

export const MyProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name cannot exceed 50 characters.",
    })
    .optional(), // Make name optional
  photo: z
    .union([
      z.string().refine((val) => val.startsWith("blob:"), {
        message: "Invalid Blob URL",
      }), // Check if it's a Blob URL

      z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File size must be less than 5MB",
        })
        .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
          message: "Only JPEG and PNG files are allowed",
        }), // Check if it's a valid File
    ])
    .optional(), // Make photo optional
});

export type MyProfileFormSchemaType = z.infer<typeof MyProfileFormSchema>;
