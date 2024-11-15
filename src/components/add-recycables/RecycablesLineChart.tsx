import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Type definitions for the series and chart options
interface Series {
  name: string;
  data: number[]; // Chart data for the series
}

// Enum for Category and Duration
export enum Category {
  PLASTIC = "PLASTIC",
  NYLON = "NYLON",
  CAN = "CAN",
  METAL = "METAL",
  PAPER = "PAPER",
}

export enum Duration {
  Day = "Day",
  Month = "Month",
  Year = "Year",
}

interface Props {
  category: Category;
  duration: Duration;
}

// Data structure for categories and durations with corresponding chart data
const categoryData: Record<Category, Record<Duration, [string, number][]>> = {
  PLASTIC: {
    Day: [
      ["Mon", 30],
      ["Tue", 40],
      ["Wed", 35],
      ["Thu", 50],
      ["Fri", 60],
      ["Sat", 55],
      ["Sun", 65],
    ],
    Month: [
      ["Jan", 100],
      ["Feb", 120],
      ["Mar", 110],
      ["Apr", 130],
      ["May", 140],
      ["Jun", 150],
      ["Jul", 160],
      ["Aug", 170],
      ["Sep", 180],
      ["Oct", 190],
      ["Nov", 200],
      ["Dec", 210],
    ],
    Year: [
      ["2021", 300],
      ["2022", 350],
      ["2023", 330],
    ],
  },
  NYLON: {
    Day: [
      ["Mon", 20],
      ["Tue", 25],
      ["Wed", 15],
      ["Thu", 30],
      ["Fri", 35],
      ["Sat", 40],
      ["Sun", 50],
    ],
    Month: [
      ["Jan", 80],
      ["Feb", 85],
      ["Mar", 90],
      ["Apr", 100],
      ["May", 110],
      ["Jun", 120],
      ["Jul", 130],
      ["Aug", 140],
      ["Sep", 150],
      ["Oct", 160],
      ["Nov", 170],
      ["Dec", 180],
    ],
    Year: [
      ["2021", 200],
      ["2022", 250],
      ["2023", 220],
    ],
  },
  CAN: {
    Day: [
      ["Mon", 25],
      ["Tue", 30],
      ["Wed", 25],
      ["Thu", 35],
      ["Fri", 40],
      ["Sat", 35],
      ["Sun", 45],
    ],
    Month: [
      ["Jan", 70],
      ["Feb", 80],
      ["Mar", 75],
      ["Apr", 85],
      ["May", 90],
      ["Jun", 95],
      ["Jul", 100],
      ["Aug", 110],
      ["Sep", 120],
      ["Oct", 130],
      ["Nov", 140],
      ["Dec", 150],
    ],
    Year: [
      ["2021", 250],
      ["2022", 300],
      ["2023", 270],
    ],
  },
  METAL: {
    Day: [
      ["Mon", 10],
      ["Tue", 15],
      ["Wed", 10],
      ["Thu", 15],
      ["Fri", 20],
      ["Sat", 15],
      ["Sun", 20],
    ],
    Month: [
      ["Jan", 40],
      ["Feb", 50],
      ["Mar", 45],
      ["Apr", 55],
      ["May", 60],
      ["Jun", 55],
      ["Jul", 60],
      ["Aug", 70],
      ["Sep", 65],
      ["Oct", 70],
      ["Nov", 65],
      ["Dec", 70],
    ],
    Year: [
      ["2021", 100],
      ["2022", 150],
      ["2023", 120],
    ],
  },
  PAPER: {
    Day: [
      ["Mon", 20],
      ["Tue", 25],
      ["Wed", 15],
      ["Thu", 30],
      ["Fri", 35],
      ["Sat", 40],
      ["Sun", 50],
    ],
    Month: [
      ["Jan", 60],
      ["Feb", 70],
      ["Mar", 65],
      ["Apr", 75],
      ["May", 80],
      ["Jun", 85],
      ["Jul", 90],
      ["Aug", 100],
      ["Sep", 95],
      ["Oct", 100],
      ["Nov", 95],
      ["Dec", 100],
    ],
    Year: [
      ["2021", 200],
      ["2022", 250],
      ["2023", 220],
    ],
  }
};

// Component
const AddRecycablesApexLineChart: React.FC<Props> = ({
  category,
  duration,
}) => {
  // Get chart data based on the category and duration
  const getChartData = (category: Category, duration: Duration) => {
    const data = categoryData[category]?.[duration] || [];
    const categories = data.map((item) => item[0]);
    const seriesData = data.map((item) => item[1]);
    return { categories, seriesData };
  };

  // Chart options based on the category, duration, and categories
  const getChartOptions = (
    _category: Category,
    _duration: Duration,
    categories: string[]
  ): ApexOptions => {
    return {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: { type: "x", enabled: true, autoScaleYaxis: true },
        toolbar: { autoSelected: "zoom" },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      title: { text: "", align: "left" },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: { formatter: (val: number) => val.toFixed(0) },
        title: { text: "Value" },
      },
      xaxis: {
        type: "category",
        categories: categories,
      },
      tooltip: {
        shared: false,
        y: { formatter: (val: number) => val.toFixed(0) },
      },
      colors: ["#548235"],
    };
  };

  // State for series and options
  const [series, setSeries] = useState<Series[]>([
    {
      name: category,
      data: getChartData(category, duration).seriesData,
    },
  ]);

  const [options, setOptions] = useState<ApexOptions>(
    getChartOptions(
      category,
      duration,
      getChartData(category, duration).categories
    )
  );

  // Update chart on category or duration change
  useEffect(() => {
    const { categories, seriesData } = getChartData(category, duration);

    setSeries([
      {
        name: category,
        data: seriesData,
      },
    ]);

    setOptions(getChartOptions(category, duration, categories));
  }, [category, duration]);

  return (
    <div className="mt-16">
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default AddRecycablesApexLineChart;
