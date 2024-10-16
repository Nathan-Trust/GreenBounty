import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderCellContent } from "@/utils/status";
import { settingsTableHeaders } from "@/store/settings";
import { truncateText } from "@/utils/text";

const sampleData = [
  {
    id: "2345",
    email: "nathantrustekanem@mail.com",
    fullName: "Gregory Michael",
    role: "Super admin",
    joinedDate: "2nd Aug , 2023",
    createdBy: "User001",
    status: "Active",
  },
];

const SettingsTable: React.FC = () => {
  const renderTablesHeaders = settingsTableHeaders.map((header) => (
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
            const { id, email, fullName, role, joinedDate, createdBy, status } = data;
            return (
              <TableRow
                key={id}
                className={`border-none ${
                  index % 2 === 0
                    ? "bg-white hover:bg-white/75"
                    : "bg-lightGreen hover:bg-lightGreen/75"
                } `}
              >
                <TableCell className="whitespace-nowrap">{id}</TableCell>
                <TableCell className="whitespace-nowrap">{email}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {truncateText(fullName,20)}
                </TableCell>
                <TableCell className="whitespace-nowrap">{role}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {joinedDate}
                </TableCell>
                <TableCell className="whitespace-nowrap">{createdBy}</TableCell>
                <TableCell className="flex ">
                  {(status && renderCellContent(status as "Active")) || "N/A"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SettingsTable;
