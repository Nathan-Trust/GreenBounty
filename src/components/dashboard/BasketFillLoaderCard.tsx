import { Card, CardContent } from "../ui/card";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type
import { useMemo } from "react";
import { Button } from "../ui/button";

type BasketFillLoaderCardProps = {
  dataValue: number; // Define type for the dataValue prop
};

const BasketFillLoaderCard: React.FC<BasketFillLoaderCardProps> = ({
  dataValue,
}) => {
  // Define labels
  const labels = ["0-30", "30-50", "50-80", "80-100"];

  // Determine the segments based on the dataValue
  const getSeriesData = (value: number): number[] => {
    if (value <= 30) return [value, 100 - value]; // 0-30
    if (value <= 50) return [30, value - 30, 100 - value]; // 30-50
    if (value <= 80) return [30, 20, value - 50, 100 - value]; // 50-80
    return [30, 20, 30, value - 80]; // 80-100
  };

  // Define the colors based on ranges
  const getColors = (value: number): string[] => {
    if (value <= 30) return ["#FFFFFF", "rgba(0, 0, 0, 0.1)"];
    if (value <= 50) return ["#34A853", "#34A853", "rgba(0, 0, 0, 0.1)"];
    if (value <= 80)
      return ["#FFD700", "#FFD700", "#FFD700", "rgba(0, 0, 0, 0.1)"];
    return ["#EA4335", "#EA4335", "#EA4335", "#EA4335"];
  };

  const seriesData = useMemo(() => getSeriesData(dataValue), [dataValue]);
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: labels,
    colors: getColors(dataValue),
    plotOptions: {
      pie: {
        donut: {
          size: "70%", // Adjust donut thickness
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: () => `${dataValue}`, // Show the overall dataValue
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      show: false,
    },
  };

  return (
    <Card className="col-span-12 lg:col-span-7 row-span-2 bg-[#548235] text-white">
      <CardContent className="flex flex-col h-full pb-2 md:pb-0">
        <div className="flex flex-row justify-between h-full">
          <ReactApexChart
            options={chartOptions}
            series={seriesData}
            type="donut"
            width="89%" // Adjust as needed for your layout
            aria-label="Basket fill loader chart"
          />
          <div className="w-fit h-full  flex flex-col justify-between">
            <div className=" h-fit flex flex-col gap-3 w-full  mt-4">
              <div className="flex gap-1.5 items-center text-xs">
                <div className="h-3 w-3 rounded-full bg-white" />
                <span>0%-30%</span>
              </div>
              <div className="flex gap-1.5 items-center text-xs">
                <div className="h-3 w-3 rounded-full bg-[#34A853]" />
                <span>30%-50%</span>
              </div>
              <div className="flex gap-1.5 items-center text-xs">
                <div className="h-3 w-3 rounded-full bg-[#FFD700]" />
                <span>50%-80%</span>
              </div>
              <div className="flex gap-1.5 items-center text-xs">
                <div className="h-3 w-3 rounded-full bg-[#EA4335]" />
                <span>80%-100%</span>
              </div>
            </div>
            <Button className="text-[#548235] hidden lg:block mt-6 bg-white w-fit mb-3 hover:bg-white">
              Add Recycables
            </Button>
          </div>
        </div>
        <Button className="text-[#548235] self-end bg-white lg:hidden w-fit mb-3 hover:bg-white">
          Add Recycables
        </Button>
      </CardContent>
    </Card>
  );
};

export default BasketFillLoaderCard;
