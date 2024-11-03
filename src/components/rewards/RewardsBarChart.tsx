import { DataByRange } from "@/app/(dashboard)/rewards/client";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
  YAxis,
  Rectangle,
} from "recharts";

interface RewardsBarChartProps {
  dataByRange: DataByRange;
  chartTitle?: string;
}

const RewardsBarChart = ({
  dataByRange,
  chartTitle,
}: RewardsBarChartProps) => {

  const getBarColor = (reward: number) => {
    if (reward > 50) return "#92DD56"; // High
    if (reward > 20) return "#20B25C"; // Medium
    return "#6ED699"; // Low
  };
  const data = dataByRange.year.map((item) => ({
    name: item.month,
    reward: item.reward,
    color: getBarColor(item.reward),
  }));

  return (
    <div className="col-span-12 bg-[#548235]  rounded-md h-[350px] p-3">
      <div className="flex flex-col md:flex-row justify-between md:items-center font-medium">
        <p className="text-white">{chartTitle}</p>
        <div className=" h-fit flex  gap-6 w-fit text-white ">
          <div className="flex gap-1.5 items-center text-xs">
            <div className="h-3 w-3 rounded-full bg-[#6ED699]" />
            <span>$20 below</span>
          </div>
          <div className="flex gap-1.5 items-center text-xs">
            <div className="h-3 w-3 rounded-full bg-[#20B25C]" />
            <span>$20-$50</span>
          </div>
          <div className="flex gap-1.5 items-center text-xs">
            <div className="h-3 w-3 rounded-full bg-[#92DD56]" />
            <span>$50 above</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#FFFFFF" }}
            axisLine={false}
          />
          <YAxis hide />
          <Bar
            dataKey="reward"
            fill="#8884d8"
            stroke="#4b7530"
            activeBar={
              <Rectangle fill="pink" stroke="blue" className="bg-[#4b7530]" />
            }
            barSize={20}
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RewardsBarChart;
