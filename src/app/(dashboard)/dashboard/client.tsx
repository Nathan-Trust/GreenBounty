import CustomCard from "@/components/shared/CustomCard";
import ChartWithDropdown from "@/components/shared/CustomChartWithDropdown";
import { cardItems, chartConfig, dataByRange } from "@/store/dashboard";

const renderCardItems = () => {
  return cardItems.map((item) => (
    <CustomCard
      key={item.label}
      item={item}
      className="col-span-12 md:col-span-6 border-none lg:col-span-4"
    />
  ));
};

export interface DataItem {
  month: string;
  desktop: number;
  mobile: number;
}

export interface DataByRange {
  today: DataItem[];
  month: DataItem[];
  year: DataItem[];
}

const DashboardClient = () => {
  return (
    <div className=" p-3 w-full h-fit">
      <div className="grid grid-cols-12 gap-4 w-full h-fit">
        {renderCardItems()}

        <ChartWithDropdown
          dataByRange={dataByRange}
          chartConfig={chartConfig}
          yAxisTicks={[0, 10, 50, 100, 200]}
          chartTitle="Projects Created"
        />
        <ChartWithDropdown
          dataByRange={dataByRange}
          chartConfig={chartConfig}
          yAxisTicks={[0, 10, 50, 100, 200]}
          chartTitle="Active Users"
        />
        <ChartWithDropdown
          dataByRange={dataByRange}
          chartConfig={chartConfig}
          yAxisTicks={[0, 10, 50, 100, 200]}
          chartTitle="Logs Created"
        />
        <ChartWithDropdown
          dataByRange={dataByRange}
          chartConfig={chartConfig}
          yAxisTicks={[0, 10, 50, 100, 200]}
          chartTitle="Project Issues"
        />
      </div>
    </div>
  );
};

export default DashboardClient;
