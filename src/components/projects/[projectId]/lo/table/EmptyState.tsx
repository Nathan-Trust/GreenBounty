import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Lottie from "react-lottie";
import noResultAnimationData from "../../../../../assets/lotties/no-result.json";
import { logsTableHeaders } from "@/store/logs";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: noResultAnimationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const TableEmptyState = () => {
  const renderTablesHeaders = logsTableHeaders.map((header) => (
    <TableHead key={header}>{header}</TableHead>
  ));
  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto  rounded-lg w-full col-span-3">
      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase whitespace-nowrap text-xs bg-lightGreen hover:bg-lightGreen">
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white h-[300px]">
          <TableRow className="border-none text-gray-500 bg-transparent hover:bg-transparent">
            <TableCell colSpan={10} className="text-center">
              <Lottie options={defaultOptions} height={200} width={200} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableEmptyState;
