import { useState } from "react";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BasketFillLoaderCard from "@/components/dashboard/BasketFillLoaderCard";
import { Truck } from "lucide-react";
import { useStore } from "@/store/user";
import { truncateText } from "@/utils/text";
import { Badge } from "@/components/ui/badge";
import Pickup from "@/components/myprofile/pickup";
import { convertCoinsToNGNCurrency } from "@/utils/currency";

const DashboardClient = () => {
  const { userData } = useStore();
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => {
    setShowBalance((prevState) => !prevState);
  };

  return (
    <>
      <div className="grid grid-cols-11 p-1.5 mini-md:p-6  max-w-screen-lg mx-auto gap-4 mini-md:gap-3 ">
        {/* top card banner */}
        <Card
          className="col-span-11 md:col-span-7 lg:col-span-5 bg-[#548235] md:order-1 rounded-xl text-white"
          style={{
            background:
              "linear-gradient(231deg, #548235 27.7%, rgba(18, 28, 11, 0.80) 119.68%)",
          }}
        >
          <CardContent className="flex flex-col pt-4 h-[190px] justify-between pb-2 md:pb-0">
            <div className="text-lg flex gap-x-10 items-center">
              <p>Eco-Coin </p>
              <button onClick={toggleBalanceVisibility} className="ml-2 ">
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-4 text-2xl ">
              {showBalance
                ? userData?.wallet
                  ? convertCoinsToNGNCurrency(userData?.wallet)
                  : "Invalid wallet balance"
                : "***********"}
            </p>
            <div className="flex justify-between items-center">
              <p>{truncateText(userData?.name?.toUpperCase() ?? "", 20)}</p>
              <div className="relative h-20 w-[105px]">
                <div className="absolute w-16 h-16 rounded-full z-10 bg-[#93B77C]" />
                <div className="absolute w-16 h-16 z-20 rounded-full left-10 bg-[#7CAB5CA6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-11 md:col-span-4  md:order-2  lg:col-span-3  bg-[#4B742F]  text-white">
          <CardContent className="flex gap-4 items-start p-4 h-full">
            <div className="flex flex-col justify-between  h-full w-full">
              <p className="text-sm">Total No. of Recycles</p>
              <div className="flex  w-full mt-4 md:mt-0 justify-between">
                <p className="text-xl font-medium">500</p>
                <div className="text-[#CDAF0E] flex md:hidden ">
                  <TrendingUp />{" "}
                  <p>
                    20% <span className="text-white">vs Last Quarter</span>
                  </p>
                </div>
              </div>
              <div>
                <div className="text-[#CDAF0E] hidden md:flex ">
                  <TrendingUp />{" "}
                  <p className="truncate">
                    20% <span className="text-white">vs Last Quarter</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-11 md:col-span-4 md:order-4  lg:order-3  lg:col-span-3  bg-[#4B742F]  text-white">
          <CardContent className="flex gap-4 items-start p-4 h-full">
            <div className="flex flex-col justify-between w-full h-full">
              <p className="text-sm">Most Recycled Item</p>
              <div className="flex w-full justify-between items-center mt-6 md:mt-0">
                <div>
                  <p className="text-[#CDAF0E]">Rank:</p>
                  <Badge className="text-sm rounded-md font-medium mt-0.5">
                    Plastic Bounty Hunter
                  </Badge>
                </div>
                <div className="text-[#CDAF0E] hidden sm:flex md:hidden ">
                  <TrendingUp />{" "}
                  <p>
                    20% <span className="text-white">vs Last Quarter</span>
                  </p>
                </div>
              </div>
              <div>
                <div className="text-[#CDAF0E] hidden md:flex ">
                  <TrendingUp />{" "}
                  <p className="truncate">
                    20% <span className="text-white">vs Last Quarter</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <BasketFillLoaderCard dataValue={75} />
        <Card className="col-span-11 md:col-span-4 md:order-5 h-fit lg:order-4 bg-[#9C8B2E]">
          <CardContent className="flex gap-4 items-start text-white p-4">
            <div className="text-[#9C8B2E] bg-white w-12 h-12 flex items-center rounded-md justify-center">
              <Truck />
            </div>
            <div>
              <p>Pickup Status</p>
              <p className="text-xl font-medium">Pending</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-6 pt-0">
        <Pickup className="mt-3 lg:mt-0" />
      </div>
    </>
  );
};

export default DashboardClient;
