import { Card, CardContent } from "@/components/ui/card";
import heroImg from "../../../assets/dashboard/hero-remove-bg.svg";
import BasketFillLoaderCard from "@/components/dashboard/BasketFillLoaderCard";
import { CircleDollarSign, Truck } from "lucide-react";
import { useStore } from "@/store/user";

const DashboardClient = () => {
  const {userData} = useStore()
  return (
    <div className="grid grid-cols-12 p-1.5 mini-md:p-6 max-w-screen-lg mx-auto gap-4 mini-md:gap-6 ">
      {/* top card banner */}
      <Card className="col-span-12 bg-[#548235] md:order-1  text-white ">
        <CardContent className="flex flex-col-reverse  md:flex-row items-center pb-2 md:pb-0">
          <div className="flex-1">
            <p className="text-2xl font-medium ">
              Make every Recycle Count and get Rewarded
            </p>
            <p className="mt-1.5">
              Fill your basket with recyclables and see your efforts make a
              difference. The more you recycle, the more Eco-Coins you
              earn—benefiting both you and the environment!
            </p>
          </div>
          <img
            src={heroImg}
            alt="hero-img"
            className="h-52 md:w-1/2  md:h-72"
          />
        </CardContent>
      </Card>
      <BasketFillLoaderCard dataValue={75} />
      <Card className="col-span-12 md:col-span-6 md:order-2 lg:order-3 h-fit lg:col-span-5 border bg-white border-[#548235]  ">
        <CardContent className="flex gap-4 items-start p-4">
          <div className="bg-[#548235] text-white w-12 h-12 flex items-center rounded-md justify-center">
            <CircleDollarSign />
          </div>
          <div>
            <p className="">Eco-Coin</p>
            <p className="text-xl font-medium">${userData?.wallet}</p>
          </div>
        </CardContent>
      </Card>
      <Card
        className="col-span-12 md:col-span-6 lg:col-span-5 md:order-3 h-fit lg:order-4 border border-[#548235] "
        style={{
          backgroundImage:
            "linear-gradient(161deg, #548235 12.61%, #121C0B 105.46%)",
        }}
      >
        <CardContent className="flex gap-4 items-start text-white p-4">
          <div className="text-[#548235] bg-white w-12 h-12 flex items-center rounded-md justify-center">
            <Truck />{" "}
          </div>
          <div>
            <p>Pickup Status</p>
            <p className="text-xl font-medium">Pending</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardClient;
