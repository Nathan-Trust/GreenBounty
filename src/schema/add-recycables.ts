import { Category } from "@/components/add-recycables/RecycablesLineChart";
import { z } from "zod";

export const AddRecycablesSchema = z.object({
  item: z.nativeEnum(Category, {
    required_error: "Please select an item.",
  }),
  quantity: z
    .number({
      required_error: "Please enter a quantity.",
      invalid_type_error: "Quantity must be a number.",
    })
    .positive("Quantity must be a positive number.")
    .int("Quantity must be an integer."),
});



export type AddRecycablesSchemaType = z.infer<typeof AddRecycablesSchema>;