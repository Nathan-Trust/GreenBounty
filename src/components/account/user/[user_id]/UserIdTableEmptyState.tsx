import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userIdTableHeader } from "@/store/user_id";

const UserIdTableEmptyState = () => {
  const renderTablesHeaders = userIdTableHeader.map((header) => (
    <TableHead key={header}>{header}</TableHead>
  ));
  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto rounded-lg w-full col-span-3">
      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase whitespace-nowrap text-xs bg-lightGreen hover:bg-lightGreen">
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white h-[200px]">
          <TableRow className="border-none text-gray-500 bg-transparent  hover:bg-transparent">
            <TableCell colSpan={9} className="text-center hover:bg-transparent">
              No users found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default UserIdTableEmptyState;
