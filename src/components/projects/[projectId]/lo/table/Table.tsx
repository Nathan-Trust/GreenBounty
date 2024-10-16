import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncateText } from "@/utils/text";
import { logsTableHeaders } from "@/store/logs";
import {
  ProjectLogsStatus,
  renderProjectLogsCellContent,
} from "@/utils/status";
import SelectedProjectModal from "../modal/SelectedProjectModal";
import { ProjectLogs } from "@/services/project";
import { formatDate } from "@/utils/date";

export const sampleData = [
  {
    id: 23478,
    logNumber: 23001,
    logTitle: "Residential Developement Lekki",
    logType: "Residential",
    duration: "50",
    status: "Non Issue",
    description: "Residential Development Issue at Lekki toll gate",
    dateCreated: "2nd August 2024",
    createdBy: "Christopher",
    dateModified: "2nd August, 2023",
    modifiedBy: "Christopher",
  },
];

interface TableComponentProps {
  projectLogs?: ProjectLogs[];
}


const TableComponent: React.FC<TableComponentProps> = ({ projectLogs }) => {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isRowSelected, setIsRowSelected] = useState<boolean>(false);

  const renderTablesHeaders = logsTableHeaders.map((header) => (
    <TableHead
      className="h-[18px] py-3 uppercase text-lightGray_three text-xs whitespace-nowrap"
      key={header}
    >
      {header}
    </TableHead>
  ));

  const handleRowClick = (id: string) => {
    setSelectedRowId(id); // Set the clicked row's id to trigger the dialog
    setIsRowSelected(true); // Show the dialog
  };

  const closeDialog = () => {
    setSelectedRowId(null); // Close the dialog by resetting the id
    setIsRowSelected(false); // Hide the dialog
  };

  return (
    <div className="relative mt-8 lg:mt-5 overflow-x-auto ">
      <Table>
        <TableHeader className="bg-lightGreen">
          <TableRow className="border-none  hover:bg-transparent">
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {projectLogs?.map((data, index) => {
            const {
              user_id,
              description,
              log_title,
              created_at
            } = data;
            return (
              <TableRow
                key={user_id}
                onClick={() => handleRowClick(log_title)}
                className={`border-none font-medium text-lightGray_three ${
                  index % 2 === 0
                    ? "bg-white hover:bg-white/75"
                    : "bg-lightGreen hover:bg-lightGreen/75"
                } `}
              >
                <TableCell className="whitespace-nowrap">{user_id}</TableCell>
                <TableCell className="whitespace-nowrap">{log_title}</TableCell>
                <TableCell className="whitespace-nowrap text-black">
                  {truncateText(log_title, 20)}
                </TableCell>
                <TableCell className="whitespace-nowrap">Commercial</TableCell>
                <TableCell className="whitespace-nowrap">
                  {renderProjectLogsCellContent(
                    "Non Issue" as ProjectLogsStatus
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {truncateText(description, 24)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(created_at)}
                </TableCell>
                <TableCell className="whitespace-nowrap capitalize">
                  {user_id}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(created_at)}
                </TableCell>
                <TableCell className="whitespace-nowrap">{user_id}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isRowSelected && (
        <SelectedProjectModal
          selectedRowId={selectedRowId!}
          closeDialog={closeDialog}
          projectLogs={projectLogs}
        />
      )}
    </div>
  );
};

export default TableComponent;
