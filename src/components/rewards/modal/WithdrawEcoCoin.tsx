import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import StepOne from "./withdrawal-steps/StepOne";
import StepTwo from "./withdrawal-steps/StepTwo";
import StepThree from "./withdrawal-steps/StepThree";
import useMultiForm from "@/hooks/useMultiForm";
import { WithdrawFormSchema } from "@/schema/wallet";
import { logger } from "@/utils/logger";
import { useAccountStore } from "@/store/wallet";
import { errorToast, successToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest";

const WithdrawEcoCoin: React.FC = () => {
    const [loading, setLoading] = useState(false);
  const { handleWithdrawal}= useAccountStore();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const form = useForm<z.infer<typeof WithdrawFormSchema>>({
    resolver: zodResolver(WithdrawFormSchema),
    defaultValues: {
      account: selectedCard ?? "",
      amount: 0,
      description: "",
    },
    mode: "onChange",
  });

  const stepTitles = ["Select Card", "Withdrawal Details", "Checkout"];
  const steps = [
    <StepOne
      key={1}
      onSelectCard={setSelectedCard}
      selectedAccount={selectedCard}
    />,
    <StepTwo key={2} form={form} />,
    <StepThree key={3} />,
  ];

  const { currentStateIndex, step, isLastStep, next } = useMultiForm(steps);

  const handleProceed = async () => {
    if (currentStateIndex === 0) {
      const isValid = selectedCard !== null;
      if (isValid) {
        next();
      } else {
        alert("Please select a card before proceeding.");
      }
    } else if (currentStateIndex === 1) {
      const isValid = await form.trigger(["amount", "description"]);
      if (isValid) {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof WithdrawFormSchema>) => {
      setLoading(true);
    try {
      await handleWithdrawal(data);
      logger("Form submitted:", data);
      successToast({
        title: "Withdrawal Successful",
        message: "Your rewards have been withdrawn successfully.",
      })
      next();
    } catch (error) {
      setLoading(false);
      errorToast({
        title: "Withdrawal Failed",
        message: (error as ApiError)?.response?.data?.message ?? "Failed to withdraw your rewards. Please try again later.",
      })
    }
    // Implement form submission logic
  };
  useEffect(() => {
    if (selectedCard) {
      form.setValue("account", selectedCard);
    }
  }, [selectedCard, form]);


  return (
    <div className="modal p-0 bg-white max-h-[500px] overflow-y-auto hide-scrollbar">
      <p className="text-lg font-semibold mb-4">Withdraw your rewards</p>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-3  w-[400px] md:w-full gap-4 mb-6 mt-3">
          {stepTitles.map((title, index) => (
            <div key={index} className="text-center ">
              <h2 className={`pb-2 cursor-pointer text-sm`}>{title}</h2>
              <div
                className={`w-full h-1 rounded-md transition-all duration-300 ease-in-out ${
                  currentStateIndex >= index ? "bg-[#30a46c]" : "bg-[#0000330F]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="step-content mb-6">
        {currentStateIndex <= 1 ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 p-2"
            >
              {step}
              <Button
                type={isLastStep ? "submit" : "button"}
                onClick={handleProceed}
                disabled={
                  currentStateIndex === 0
                    ? !selectedCard
                    : !form.formState.isValid || // Disable if form is invalid
                      loading // Disable if no card selected on first step
                  // Disable if loading is true
                }
                className="w-full flex items-center justify-center"
              >
                {loading
                  ? "Loading..."
                  : currentStateIndex === 1
                  ? "Continue"
                  : "Proceed"}
              </Button>
            </form>
          </Form>
        ) : (
          step
        )}
      </div>
    </div>
  );
};

export default WithdrawEcoCoin;
