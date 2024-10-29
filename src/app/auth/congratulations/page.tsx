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

const CongratulationsPage = () => {
  const defaultOptions = {
    loop: true,
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
        <Button type="submit" className="w-full">
          Proceed to Dashboard{" "}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CongratulationsPage;
