"use client";
import { SetStateAction, useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { DropDown } from "./CustomDropdown";
import { Calendar } from "lucide-react";
import { DataByRange } from "@/types/dashboard";

interface ChartWithDropdownProps {
  dataByRange: DataByRange;
  chartConfig: {
    desktop: { color: string };
    mobile: { color: string };
  };
  chartTitle?: string;
  yAxisTicks?: number[];
}

const ChartWithDropdown = ({
  dataByRange,
  chartConfig,
  yAxisTicks = [0, 10, 50, 100, 200],
  chartTitle
}: ChartWithDropdownProps) => {
  const [timeRange, setTimeRange] = useState("year");

  const dropdownOptions = [
    { value: "today", label: "Today" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];

  const handleTimeRangeChange = (value: SetStateAction<string>) => {
    setTimeRange(value);
  };

  // TODO: CHECK OUT THE Y-AXIS
  // eslint-disable-next-line no-console
  console.log("Y-AXIS", yAxisTicks)

  return (
    <div className="col-span-12 bg-white lg:col-span-6 shadow-lg  rounded-md p-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-medium ">
        <p>{chartTitle}</p>
        <DropDown
          options={dropdownOptions}
          label="Time Range"
          onSelect={handleTimeRangeChange}
          buttonIcon={<Calendar size={16} className="mr-2" />}
        />
      </div>

      {/* Chart Section */}
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={dataByRange[timeRange as keyof DataByRange]}>
          <XAxis dataKey="month" />
          {/* <YAxis ticks={yAxisTicks} /> */}
          <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
          <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartWithDropdown;
