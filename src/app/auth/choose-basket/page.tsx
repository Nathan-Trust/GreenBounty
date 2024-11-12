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
import { AuthService } from "@/services/auth";
import { errorToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest";
import LoadingDots from "@/components/shared/LoadingDots";
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";
import { capitalizeFirst } from "@/utils/text";
import { logger } from "@/utils/logger";

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

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<"PREMIUM" | "STANDARD" | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  // const fromSignIn = location.state?.fromSignIn;

  // useEffect(() => {
  //   if (!fromSignIn) {
  //     navigate(Green_Bounty_Routes.signIn, { replace: true });
  //   }
  // }, [fromSignIn, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactionDetails, setTransactionDetails] = useState<any>(null);

  // Extract trxref and reference from search params
  const searchParams = new URLSearchParams(location.search);
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  // Fetch transaction details when trxref or reference changes
  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (trxref && reference) {
        try {
          setLoading(true);
          const details = await AuthService.getTransactionDetails(
            trxref,
            reference
          ); // Replace with the actual method to fetch details
          setTransactionDetails(details);
        } catch (error) {
          logger("Error fetching transaction details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTransactionDetails();
  }, [trxref, reference]);

  const onSubmit = async (data: "STANDARD" | "PREMIUM") => {
    try {
      setLoading(true);
      const res = await AuthService.chooseBasket(data);
      if (data === "PREMIUM" && res.data) {
        window.location.href = res.data;
      }
    } catch (err) {
      errorToast({
        title: "Error",
        message:
          (err as ApiError)?.response?.data?.message ??
          "An error occurred while logging in. Please try again.",
      });
    } finally {
      setLoading(false);
      setSelected(null)
    }
  };

  // Function to display the receipt
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayReceipt = (transactionDetails: any) => {
    if (!transactionDetails) return null;

    return (
      <div>
        <h2>Transaction Receipt</h2>
        <p>
          <strong>Transaction ID:</strong> {transactionDetails.trxref}
        </p>
        <p>
          <strong>Reference:</strong> {transactionDetails.reference}
        </p>
        <p>
          <strong>Status:</strong> {transactionDetails.status}
        </p>
        <p>
          <strong>Amount:</strong> {transactionDetails.amount}
        </p>
        <p>
          <strong>Message:</strong> {transactionDetails.message}
        </p>
        <p>
          <strong>Response:</strong> {transactionDetails.response}
        </p>
      </div>
    );
  };

  // Display the transaction receipt or loading state
  const renderReceipt = transactionDetails ? (
    displayReceipt(transactionDetails)
  ) : (
    <LoadingDots />
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-[450px] mx-auto border-none shadow-none outline-none">
        {/* Conditional rendering based on whether transactionDetails is present */}
        {transactionDetails ? (
          <CardContent className="space-y-5">
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
                    } border-2 flex items-center p-4 rounded-lg`}
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
