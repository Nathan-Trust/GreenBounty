import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Adjust the import based on your form components
import { Input } from "@/components/ui/input"; // Adjust based on your input components
import { Textarea } from "@/components/ui/textarea";
import { WithdrawFormSchemaType } from "@/schema/wallet";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Assuming you're using this icon component
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface StepTwoFormProps {
  form: UseFormReturn<WithdrawFormSchemaType>;
}

const StepTwo = ({ form }: StepTwoFormProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // Track the total amount

  const handleToggle = () => {
    setShowDetails(!showDetails);
  };

  // Recalculate total when the amount changes
  useEffect(() => {
    const amount = form.getValues("amount");
    if (amount) {
      setTotalAmount(amount * 10); // 1 coin = 10 Naira
    }
  }, [form.watch("amount")]);

  return (
    <div className="pb-8 border-b space-y-3">
      <p className="text-[#646464] text-sm">Pricing Information</p>
      <div className="bg-[#0047F112] text-sm p-3 mt-2 rounded-md">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={handleToggle}
        >
          <p className="text-md font-medium">
            Explain Your Coin Withdrawal Process
          </p>
          <ChevronDown
            className={`transition-transform ${
              showDetails ? "rotate-180" : "rotate-0"
            }`}
            size={20}
          />
        </div>
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#1C2024] text-xs mt-1.5 overflow-hidden"
            >
              <p>
                Help buyers understand exactly how the coin withdrawal process
                works.
              </p>
              <p className="mt-1.5">
                For example, if you’re withdrawing a specific amount of coin,
                specify the process, such as: &quot;To withdraw 10 coins, enter
                the amount, confirm your account details, and proceed with the
                withdrawal confirmation.&quot;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="12"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a brief description of your withdrawal request (e.g., 'Withdrawal for event supplies' or 'Cash withdrawal for personal use')"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Displaying the Total Amount */}
      <div className="bg-[#0047F112] flex justify-between text-sm p-3 mt-2 rounded-md">
        <p>Total</p>
        <p>{totalAmount} Naira</p>
      </div>
    </div>
  );
};

export default StepTwo;
