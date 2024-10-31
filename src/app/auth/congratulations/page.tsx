import Lottie from "react-lottie";
import animationData from "../../../assets/lotties/tick2.json";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Green_Bounty_Routes } from "@/store/route";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";

const CongratulationsPage = () => {
  useTitleUpdater({
    [Green_Bounty_Routes.congratulations]: "GreenBounty | Congratulations",
  });

  useMetaTagUpdater({
    [Green_Bounty_Routes.congratulations]: [
      {
        name: "description",
        content:
          "Congratulations on successfully creating your GreenBounty account! Start turning trash into treasure today.",
      },
      {
        name: "keywords",
        content:
          "GreenBounty, congratulations, account created, sustainability, eco-friendly",
      },
    ],
  });

  const navigate = useNavigate();
  const location = useLocation();

  const fromVerifyOtp = location.state?.fromVerifyOtp;

  useEffect(() => {
    if (!fromVerifyOtp) {
      navigate(Green_Bounty_Routes.signIn, { replace: true });
    }
  }, [fromVerifyOtp, navigate]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Card className="border-none  shadow-none outline-none ">
      <CardHeader className="text-center pt-2">
        <Lottie options={defaultOptions} height={100} width={100} />
        <CardTitle className="text-3xl">Congratulations</CardTitle>
        <CardDescription className="mt-3 max-w-[300px] mx-auto">
          You have successfully created an account on GreenBounty. Go ahead to
          turn your trash to treasure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          type="submit"
          onClick={() => navigate(Green_Bounty_Routes.signIn)}
          className="w-full"
        >
          Proceed to Dashboard{" "}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CongratulationsPage;
