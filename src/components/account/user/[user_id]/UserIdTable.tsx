import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userIdTableHeader } from "@/store/user_id";
import { truncateText } from "@/utils/text";

const UserIdTable = () => {
  const renderTablesHeaders = userIdTableHeader.map((header) => (
    <TableHead
      className="h-[18px] py-3 uppercase text-lightGray_three text-xs whitespace-nowrap"
      key={header}
    >
      {header}
    </TableHead>
  ));

  const sampleData = [
    {
      id: 23478,
      user: 10,
      number: 23001,
      title: "Residential Developement by Lekki toll gate",
      location: "Lekki,Lagos",
      startDate: "2nd August, 2023",
      duration: 12,
      durationType: "months",
      type: "Residential",
    },
    {
      id: 23479,
      user: 10,
      number: 23002,
      title: "Residential Developement by Lekki toll gate",
      location: "Lekki,Lagos",
      startDate: "2nd August, 2023",
      duration: 12,
      durationType: "weeks",
      type: "Residential",
    },
  ];

  return (
    <div className="relative mt-8 lg:mt-5 overflow-x-auto ">
      <Table>
        <TableHeader className="bg-lightGreen">
          <TableRow className="border-none uppercase whitespace-nowrap text-xs  hover:bg-transparent">
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {sampleData.map((data, index) => {
            const {
              id,
              user,
              number,
              title,
              location,
              startDate,
              duration,
              durationType,
              type,
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
                <TableCell className="whitespace-nowrap">{user}</TableCell>
                <TableCell className="whitespace-nowrap">{number}</TableCell>
                <TableCell className="whitespace-nowrap text-black">
                  {truncateText(title, 20)}
                </TableCell>
                <TableCell className="whitespace-nowrap">{location}</TableCell>
                <TableCell className="whitespace-nowrap">{startDate}</TableCell>
                <TableCell className="whitespace-nowrap">{duration}</TableCell>
                <TableCell className="whitespace-nowrap capitalize">
                  {durationType}
                </TableCell>
                <TableCell className="whitespace-nowrap">{type}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserIdTable;
