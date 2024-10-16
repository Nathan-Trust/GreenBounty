import { ChartConfig } from "@/components/ui/chart";
import { DataByRange } from "@/types/dashboard";


export const cardItems = [
  {
    label: "Total Number of Users",
    value: "",
  },
  {
    label: "Total Daily Active Users",
    value: "20",
  },
  {
    label: "Total Projects",
    value: "10",
  },
  {
    label: "Total Projects",
    value: "5",
  },
  {
    label: "Total Project Logs",
    value:""
  },
  {
    label: "Total Project Issues",
    value: "20",
  },
];



export const dataByRange: DataByRange = {
  today: [
    { month: "Morning", desktop: 50 },
    { month: "Afternoon", desktop: 100},
    { month: "Evening", desktop: 80 },
  ],
  month: [
    { month: "Week 1", desktop: 186, mobile: 80 },
    { month: "Week 2", desktop: 305, mobile: 200 },
    { month: "Week 3", desktop: 237, mobile: 120 },
    { month: "Week 4", desktop: 73, mobile: 190 },
  ],
  year: [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ],
};

export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#548235",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;