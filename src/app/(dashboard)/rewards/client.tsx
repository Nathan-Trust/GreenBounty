import RewardCarousel from "@/components/rewards/RewardCarousel";
import RewardsBarChart from "@/components/rewards/RewardsBarChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  Share,
  Share2,
} from "lucide-react";


export interface MonthlyRewardData {
  month: string;
  reward: number; // Total reward for the month
}

export interface DataByRange {
  year: MonthlyRewardData[];
}


const dataByRange: DataByRange = {
  year: [
    { month: "Jan", reward: 55 },
    { month: "Feb", reward: 45 },
    { month: "Mar", reward: 15 },
    { month: "Apr", reward: 75 },
    { month: "May", reward: 30 },
    { month: "June", reward: 5 },
    { month: "July", reward: 60 },
    { month: "Aug", reward: 40 },
    { month: "Sept", reward: 20 },
    { month: "Oct", reward: 10 },
    { month: "Nov", reward: 80 },
    { month: "Dec", reward: 90 },
  ],
};
const RewardsClient = () => {
  return (
    <div className="grid grid-cols-12 p-1.5 mini-md:p-6 max-w-screen-lg mx-auto gap-4 mini-md:gap-6 ">
      <RewardCarousel />
      <Card className="col-span-12 md:col-span-6   lg:col-span-5 border bg-white border-[#548235]  ">
        <CardContent className="flex gap-4 items-start p-4">
          <div className="bg-[#548235] text-white w-12 h-12 flex items-center rounded-md justify-center">
            <ChartNoAxesColumnIncreasing />{" "}
          </div>
          <div>
            <p className="">Total Profit</p>
            <p className="text-sm text-muted-foreground">
              January 2024-June 2024
            </p>
            <p className="text-xl font-medium">$20,000</p>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-12  md:col-span-6 lg:col-span-5 border bg-white border-[#548235]  ">
        <CardContent className="flex gap-4 items-start p-4">
          <div className="bg-[#548235] text-white w-12 h-12 flex items-center rounded-md justify-center">
            <CircleDollarSign />
          </div>
          <div>
            <p className="">Eco-coin balance</p>
            <p className="text-xl font-medium">$178,000</p>
          </div>
        </CardContent>
      </Card>
      <div className="col-span-12 lg:col-span-2  gap-3 ">
        <div className="flex gap-3 lg:gap-0 lg:flex-col lg:justify-between h-full">
          <Button className="lg:w-full h-[28px] rounded-sm text-xs flex justify-start bg-white border border-[#548235] text-[#548235] hover:bg-white gap-1">
            <ChartNoAxesColumnIncreasing size={15} />
            Transfer
          </Button>
          <Button className="lg:w-full h-[28px] rounded-sm text-xs flex justify-start bg-white border border-[#548235] text-[#548235] hover:bg-white gap-1">
            <Share size={15} /> Withdraw
          </Button>
          <Button className="lg:w-full h-[28px] rounded-sm text-xs flex justify-start gap-1">
            <Share2 size={15} /> Share
          </Button>
        </div>
      </div>
      <RewardsBarChart dataByRange={dataByRange} chartTitle="Rewards" />
    </div>
  );
};

export default RewardsClient;
