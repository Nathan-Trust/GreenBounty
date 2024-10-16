import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sampleData, usersTableHeaders } from "@/store/users";
import { renderCellContent } from "@/utils/status";
import { Green_Bounty_Routes } from "@/store/route";
import { useNavigate } from "react-router-dom";

const UsersTable: React.FC = () => {
  const navigate = useNavigate();
  const renderTablesHeaders = usersTableHeaders.map((header) => (
    <TableHead
      className="h-[18px] py-3  text-lightGray_three text-xs whitespace-nowrap"
      key={header}
    >
      {header}
    </TableHead>
  ));

  const handleRowClick = (id: number) => {
    navigate(`${Green_Bounty_Routes.users}/${id}`);
  };

  return (
    <div className="relative mt-8 lg:mt-5 overflow-x-auto ">
      <Table>
        <TableHeader className="bg-lightGreen">
          <TableRow className="border-none uppercase whitespace-nowrap text-xs hover:bg-transparent">
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {sampleData.map((data, index) => {
            const { id, name, email, phone, dob, company, role, status } = data;
            return (
              <TableRow
                key={id}
                onClick={() => handleRowClick(id)}
                className={`border-none ${
                  index % 2 === 0
                    ? "bg-white hover:bg-white/75"
                    : "bg-lightGreen hover:bg-lightGreen/75"
                } `}
              >
                <TableCell className="whitespace-nowrap">{id}</TableCell>
                <TableCell className="whitespace-nowrap">{name}</TableCell>
                <TableCell className="whitespace-nowrap">{email}</TableCell>
                <TableCell className="whitespace-nowrap">{phone}</TableCell>
                <TableCell className="whitespace-nowrap">{dob}</TableCell>
                <TableCell className="whitespace-nowrap">{company}</TableCell>
                <TableCell className="whitespace-nowrap">{role}</TableCell>
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

export default UsersTable;
