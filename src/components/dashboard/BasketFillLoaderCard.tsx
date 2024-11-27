import { Card, CardContent } from "../ui/card";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Green_Bounty_Routes } from "@/store/route";
import CustomDialog from "../shared/CustomDialog";
import SchedulePickup from "../myprofile/pickup/modal/SchedulePickup";

type BasketFillLoaderCardProps = {
  dataValue: number; // Define type for the dataValue prop
};

const BasketFillLoaderCard: React.FC<BasketFillLoaderCardProps> = ({
  dataValue,
}) => {
  const [open, setOpen]= useState(false)
  // Define labels
  const labels = ["0-30", "30-50", "50-80", "80-100"];
const navigate = useNavigate()
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
        breakpoint: 2560, // Medium screen
        options: {
          chart: {
            width: "78%",
            height: "100%",
          },
          legend: {
            position: "right",
          },
        },
      },
      {
        breakpoint: 806, // Small screen
        options: {
          chart: {
            width: "60%",
          },
        },
      },
      {
        breakpoint: 480, // Extra small screen
        options: {
          chart: {
            width: "60%",
          },
        },
      },
    ],
    legend: {
      show: false,
    },
  };

  return (
    <Card className="col-span-11 md:col-span-7 md:order-3 lg:order-4 md:row-span-2 bg-[#548235] text-white">
      <CardContent className="flex flex-col h-full pb-2 md:pb-0">
        <div className="flex flex-row  justify-between h-full">
          <ReactApexChart
            options={chartOptions}
            series={seriesData}
            type="donut"
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
            {/* <Button className="text-[#548235] hidden lg:block mt-6 bg-white w-fit mb-3 hover:bg-white">
              Add Recycables
            </Button> */}
          </div>
        </div>
        {dataValue === 100 ? (
          <CustomDialog
            open={open}
            onOpenChange={() => setOpen(!open)}
            className="self-end"
            triggerComponent={
              <Button
                disabled={dataValue !== 100}
                className="text-white bg-red-600 self-end w-fit mb-3 hover:bg-red-700"
              >
                Notify Admin
              </Button>
            }
          >
            <SchedulePickup setOpen={setOpen} />
          </CustomDialog>
        ) : (
          <Button
            onClick={() => navigate(Green_Bounty_Routes.addRecycables)}
            className="text-[#548235] bg-white self-end w-fit mb-3 hover:bg-white"
          >
            Add Recyclables
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BasketFillLoaderCard;
