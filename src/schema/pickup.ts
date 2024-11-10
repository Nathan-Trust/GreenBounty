import { z } from "zod";

export const PickupFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  preferredDate: z.date({ required_error: "A date of birth is required." }),
  weight: z.string().min(1, { message: "Please specify the weight." }),
  conditionSelector: z
    .string()
    .min(1, { message: "Please select an item condition." }),
    wasteType: z.array(z.string()).min(1, "Please select at least one type of waste."), 
  additionalInfo: z.string().optional(),
});



export type PickupFormSchemaType = z.infer<typeof PickupFormSchema>;