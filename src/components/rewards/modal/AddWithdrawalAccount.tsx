import { Button } from "@/components/ui/button";
import {
  Form, FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddWithdrawalAccountFormSchema } from "@/schema/wallet";
import { useAccountStore } from "@/store/wallet";
import { logger } from "@/utils/logger";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const AddWithdrawalAccount = ({
  editing = false,
  setOpen,
  selectedAccount,
}: {
  editing?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAccount?: string | null;
}) => {
  const {
    accounts,
    handleCreateWithdrawalAccount,
    fetchAccounts,
      handleUpdateWithdrawalAccount,
  } = useAccountStore();
  const selectedAccountDetails = accounts?.data?.find(
    (account) => account._id === selectedAccount
  );
  const form = useForm<z.infer<typeof AddWithdrawalAccountFormSchema>>({
    resolver: zodResolver(AddWithdrawalAccountFormSchema),
    defaultValues: {
      accountName: editing ? selectedAccountDetails?.accountName : "",
      accountNumber: editing
        ? selectedAccountDetails?.accountNumber
        : undefined,
      bankName: editing ? selectedAccountDetails?.bankName : "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof AddWithdrawalAccountFormSchema>
  ) {
    try {
      if (editing) {
        await handleUpdateWithdrawalAccount({
          _id: selectedAccountDetails?._id,
          ...values,
        });
      } else {
        await handleCreateWithdrawalAccount(values);
      }
      await fetchAccounts();
      setOpen(false);
    } catch (error) {
      logger("Error creating withdrawal account:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="">{editing ? "Edit" : "Add"} Withdrawal Account</p>
      <p className="text-[#646464] mt-4"> Account Information</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input account name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Input amount here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="keystone">Keystone bank</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-[#646464]">*Bank Charges apply</p>
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || form.formState.isSubmitting} // Disable button if form is invalid or submitting
          >
            Proceed
          </Button>{" "}
        </form>
      </Form>
    </div>
  );
};

export default AddWithdrawalAccount;
