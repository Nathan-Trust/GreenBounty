import LoadingDots from "@/components/shared/LoadingDots";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/models/serviceRequest";
import { AddRecycablesSchema } from "@/schema/add-recycables";
import { useRecyclablesStore } from "@/store/add-recycables";
import { successToast, errorToast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Category } from "../../RecycablesLineChart";

type AddRTabProps = {
  availableItems: Category[];
  selectedItem: Category;
};
const AddRTab = ({ availableItems, selectedItem }: AddRTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchRecyclables, createRecyclable } = useRecyclablesStore();
  const form = useForm<z.infer<typeof AddRecycablesSchema>>({
    resolver: zodResolver(AddRecycablesSchema),
    defaultValues: {
      item: selectedItem ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof AddRecycablesSchema>) {
    setIsLoading(true);
    try {
      await createRecyclable(data);
      successToast({
        title: "Created Recycable Successfully",
        message: "Success",
      });
      fetchRecyclables();
    } catch (error) {
      errorToast({
        title: "Failed to create recycable",
        message: (error as ApiError)?.response?.data?.message ?? "",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {availableItems.length > 0 && (
        <>
          <p className="mt-5">Add to Recycables</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              {/* Item Field */}
              <FormField
                control={form.control}
                name="item"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={selectedItem} // Set selected item as default value
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an item" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableItems.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity Field */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="input w-full"
                        placeholder="Enter quantity"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center"
              >
                {isLoading ? <LoadingDots /> : "Submit"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default AddRTab;
