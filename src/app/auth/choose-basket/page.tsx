import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import premiumBasket from "../../../assets/baskets/premium-basket.svg";
import standardBasket from "../../../assets/baskets/standardBasket.svg";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { Green_Bounty_Routes } from "@/store/route";
import { errorToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest";
import LoadingDots from "@/components/shared/LoadingDots";
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";
import { capitalizeFirst } from "@/utils/text";
import { logger } from "@/utils/logger";
import TransactionReceipt from "@/components/choose-basket/checkout";
import { useBasketStore } from "@/store/basket";

type Basket = {
  name: "STANDARD" | "PREMIUM";
  description: string;
  image: string;
};

const baskets: Basket[] = [
  {
    name: "PREMIUM",
    description:
      "This is a bigger basket for dedicated recyclers (possible in-app purchase options).",
    image: premiumBasket,
  },
  {
    name: "STANDARD",
    description: "This is a smaller basket for casual recyclers.",
    image: standardBasket,
  },
];

const ChooseBasketForm = () => {
  useTitleUpdater({
    [Green_Bounty_Routes.chooseBasket]: "GreenBounty | Choose Basket",
  });
  useMetaTagUpdater({
    [Green_Bounty_Routes.chooseBasket]: [
      {
        name: "description",
        content:
          "Verify the OTP sent to your email to reset your password on GreenBounty.",
      },
      {
        name: "keywords",
        content: "GreenBounty, OTP, verify email, password reset",
      },
    ],
  });

  const [selected, setSelected] = useState<"PREMIUM" | "STANDARD" | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    chooseBasket,
    processBasketPayment,
    transactionDetails,
    loading,
  } = useBasketStore();
  // Extract trxref and reference from search params
  const searchParams = new URLSearchParams(location.search);
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");

useEffect(() => {
  if (!trxref && !reference) {
    navigate(Green_Bounty_Routes.signIn, { replace: true });
  }
}, [trxref, reference, navigate]);



  // Fetch transaction details when trxref or reference changes
  useEffect(() => {
    const fetchAndProcessTransaction = async () => {
      if (trxref && reference) {
        try {
          const [paymentResponse] = await Promise.all([processBasketPayment()]);
          logger("Payment processed successfully:", paymentResponse);
        } catch (error) {
          logger(
            "Error fetching transaction details or processing payment:",
            error
          );
          errorToast({
            title: "Error",
            message:
              "An error occurred while processing your payment. Please try again.",
          });
        }
      }
    };

    fetchAndProcessTransaction();
  }, [trxref, reference]);

  const onSubmit = async (data: "STANDARD" | "PREMIUM") => {
    try {
      await chooseBasket(data, navigate);
    } catch (err) {
      errorToast({
        title: "Error",
        message:
          (err as ApiError)?.response?.data?.message ??
          "An error occurred while selecting your basket. Please try again.",
      });
    } finally {
      setSelected(null); // Reset the selected basket after the action
    }
  };

  const renderReceipt = transactionDetails ? (
    <TransactionReceipt />
  ) : (
    <LoadingDots />
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-[450px] mx-auto border-none shadow-none outline-none">
        {/* Conditional rendering based on whether transactionDetails is present */}
        {transactionDetails ? (
          <CardContent className="space-y-5 border rounded-tl-md rounded-tr-md w-[400px] py-4">
            {renderReceipt}
            <Button
              disabled={loading}
              onClick={() => navigate(Green_Bounty_Routes.dashboard)} // Navigate to the dashboard or relevant page
              className="w-full"
            >
              {loading ? <LoadingDots /> : "Continue to Dashboard"}
            </Button>
          </CardContent>
        ) : (
          <>
            <CardHeader className="text-center pt-2">
              <CardTitle className="text-3xl">Choose Basket</CardTitle>
              <CardDescription className="mt-3 max-w-[300px] mx-auto">
                Pick either of the baskets to continue with your bounty.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {baskets.map((basket) => {
                const isChecked = selected === basket.name;
                return (
                  <div
                    className={`${
                      isChecked
                        ? "text-primary border-primary"
                        : "text-black border-black"
                      } border-2 flex
                     items-center p-4 rounded-lg`}
                    key={basket.name}
                    onClick={() => setSelected(basket.name)}
                  >
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={basket.image} />
                    </Avatar>
                    <div className="ml-1">
                      <p className="text-md font-medium capitalize">
                        {capitalizeFirst(basket.name)} basket
                      </p>
                      <p className="text-xs">{basket.description}</p>
                    </div>
                  </div>
                );
              })}
              <Button
                disabled={!selected || loading}
                onClick={() => onSubmit(selected!)} 
                className="w-full"
              >
                {loading ? <LoadingDots /> : "Continue"}
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default ChooseBasketForm;
