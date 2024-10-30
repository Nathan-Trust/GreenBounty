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
import { useStore } from "@/store/user";
import { errorToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest";
import LoadingDots from "@/components/shared/LoadingDots";

type Basket = {
  name: "Standard" | "Premium";
  description: string;
  image: string;
};

const baskets: Basket[] = [
  {
    name: "Premium",
    description:
      "This is a bigger basket for dedicated recyclers (possible in-app purchase options).",
    image: premiumBasket,
  },
  {
    name: "Standard",
    description: "This is a smaller basket for casual recyclers.",
    image: standardBasket,
  },
];

const ChooseBasketForm = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<"Premium" | "Standard" | null>(null);
  const { saveUserData } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const fromSignIn = location.state?.fromSignIn;

  useEffect(() => {
    if (!fromSignIn) {
      navigate(Green_Bounty_Routes.signIn, { replace: true });
    }
  }, [fromSignIn, navigate]);

  const onSubmit = (data: "Standard" | "Premium") => {
    try {
      setLoading(true);
      const res = AuthService.chooseBasket(data);
      saveUserData(res);
    } catch (err) {
      errorToast({
        title: "Error",
        message:
          (err as ApiError)?.response?.data?.message ??
          "An error occurred while logging in. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className=" max-w-[450px] mx-auto border-none shadow-none outline-none ">
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
                <Avatar className="w-16 h-16 ">
                  <AvatarImage src={basket.image} />
                </Avatar>
                <div className="ml-1">
                  <p className="text-md font-medium">{basket.name} basket</p>
                  <p className="text-xs">{basket.description}</p>
                </div>
              </div>
            );
          })}
          <Button
            disabled={!selected || loading}
            onClick={() => onSubmit(selected!)}
            className="w-full "
          >
            {loading ? <LoadingDots /> : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChooseBasketForm;
