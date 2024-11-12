import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, X } from "lucide-react";
import { PickupFormSchema } from "@/schema/pickup";
import { useEffect, useState } from "react";
import { useStore } from "@/store/user";
import { logger } from "@/utils/logger";

const SchedulePickup = () => {
  const { userData } = useStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const form = useForm<z.infer<typeof PickupFormSchema>>({
    resolver: zodResolver(PickupFormSchema),
    defaultValues: {
      name: "",
      address: "",
      preferredDate: new Date(),
      weight: "",
      conditionSelector: "",
      wasteType: [],
      additionalInfo: "",
    },
  });

  function onSubmit(values: z.infer<typeof PickupFormSchema>) {
    logger("Pickup Scheduled:", values);
  }

  const standardWasteOptions = ["Bottle", "Paper", "Nylon"];
  const premiumWasteOptions = [...standardWasteOptions, "Can", "Metal", "Iron"];

  const recyclableItems =
    userData?.basket === "PREMIUM" ? premiumWasteOptions : standardWasteOptions;

  // Toggle item selection
  const handleItemClick = (item: string) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(item)
        ? prevItems.filter((selected) => selected !== item)
        : [...prevItems, item]
    );
  };

  // Remove item from selected items
  const handleRemoveItem = (item: string) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((selected) => selected !== item)
    );
  };

  useEffect(() => {
    form.setValue("wasteType", selectedItems);
    form.clearErrors("wasteType");
  }, [selectedItems, form]);



  return (
    <>
      <div>
        <p className="text-2xl font-semibold leading-none tracking-tight">
          PickUp Form
        </p>
        <p className="text-sm text-muted-foreground mt-2.5">
          Choose a date and time for us to collect your recyclables
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-h-[450px] overflow-y-auto"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name associated with the pickup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City, State" {...field} />
                </FormControl>
                <FormDescription>
                  Provide the address for the trash pickup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Date */}
          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Pickup Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>{" "}
                <FormDescription>
                  Select a convenient date for the pickup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight of Goods (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 10" {...field} />
                </FormControl>
                <FormDescription>
                  Specify the weight of the items for pickup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Condition Selector */}
          <FormField
            control={form.control}
            name="conditionSelector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition of Items</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className=" focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0">
                      <SelectValue placeholder="Select item condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="clean">Clean</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="needsSorting">Needs Sorting</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the condition of the items.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Waste Type Multiselect */}
          {/* Selected Items Display */}
          <FormField
            control={form.control}
            name="wasteType"
            render={() => (
              <FormItem>
                <FormLabel>Waste Type</FormLabel>
                <div className="flex gap-2 mt-2 items-center border overflow-x-auto px-3 h-10">
                  {selectedItems.map((item) => (
                    <div
                      key={item}
                      className="h-8 bg-white border flex items-center px-1"
                    >
                      {item}
                      <X
                        size={16}
                        className="cursor-pointer ml-2"
                        onClick={() => handleRemoveItem(item)}
                      />
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Recyclable Items List */}
          <div className="flex gap-x-1 gap-y-1 mt-4  flex-wrap">
            {recyclableItems.map((item) => (
              <Button
                key={item}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`w-fit h-8 rounded-full ${
                  selectedItems.includes(item)
                    ? "bg-primary"
                    : "bg-[#d6e1cf] hover:bg-[#d6e1cf]"
                }`}
              >
                {item}
              </Button>
            ))}
          </div>

          {/* Additional Info */}
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special instructions or requests..."
                    className="resize-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide any additional details for the pickup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
            Schedule Pickup
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SchedulePickup;
