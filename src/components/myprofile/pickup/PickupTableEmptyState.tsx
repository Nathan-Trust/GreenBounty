import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pickupTableHeaders } from "@/store/pickup";

const PickupTableEmptyState = () => {
  const renderTablesHeaders = pickupTableHeaders.map((header) => (
    <TableHead key={header}>{header}</TableHead>
  ));

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto border rounded-md w-full col-span-3">
      <Table>
        <TableHeader className="bg-[#00005506]  border-b text-[#1C2024]">
          <TableRow className="border-none text-xs whitespace-nowrap uppercase bg-lightGreen hover:bg-lightGreen">
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white h-[300px]">
          <TableRow className="border-none text-gray-500 bg-transparent hover:bg-transparent">
            <TableCell colSpan={5} className="text-center ">
              No pickups found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PickupTableEmptyState;
