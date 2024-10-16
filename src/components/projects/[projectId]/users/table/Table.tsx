import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncateText } from "@/utils/text";
import { projectUsersTableHeaders } from "@/store/projects";
import { renderCellContent, Status } from "@/utils/status";

export const sampleData = [
    {
        id: 23478,
        email: "nathantrustekanem@email.com",
        phone: "80423342324",
        company: "Ketch Inc",
        status: "Active ",
        dob: "2nd August 2024",
        fullName: "Christopher Columbus",
        role:"architect"
    }
];

const TableComponent: React.FC = () => {

  const renderTablesHeaders = projectUsersTableHeaders.map((header) => (
    <TableHead
      className="h-[18px] py-3 uppercase text-lightGray_three text-xs whitespace-nowrap"
      key={header}
    >
      {header}
    </TableHead>
  ));

  

  return (
    <div className="relative mt-8 lg:mt-5 overflow-x-auto ">
      <Table>
        <TableHeader className="bg-lightGreen">
          <TableRow className="border-none  hover:bg-transparent">
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {sampleData.map((data, index) => {
            const {
                id,
                role,
                dob,
                fullName,
                email,
                phone,
                company,
                status,
            } = data;
            return (
              <TableRow
                key={id}
                className={`border-none font-medium text-lightGray_three ${
                  index % 2 === 0
                    ? "bg-white hover:bg-white/75"
                    : "bg-lightGreen hover:bg-lightGreen/75"
                } `}
              >
                <TableCell className="whitespace-nowrap">{id}</TableCell>
                <TableCell className="whitespace-nowrap">{email}</TableCell>
                <TableCell className="whitespace-nowrap text-black">
                  {truncateText(fullName, 20)}
                </TableCell>
                <TableCell className="whitespace-nowrap">{phone}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {truncateText(dob, 24)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {truncateText(company,10)}
                </TableCell>
                <TableCell className="whitespace-nowrap capitalize">
                  {role}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {renderCellContent(status as Status)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
