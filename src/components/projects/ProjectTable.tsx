import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { projectsTableHeaders } from "@/store/projects";
import { Green_Bounty_Routes } from "@/store/route";
import { useNavigate } from "react-router-dom";
import { truncateText } from "@/utils/text";
import { Project } from "@/services/project";
import { formatDate } from "@/utils/date";

export const sampleData = [
  {
    id: 23478,
    user: 10,
    number: 23001,
    title: "Residential Developement Lekki",
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

interface ProjectsTableProps {
  data: Project[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ data }) => {
  const navigate = useNavigate();
  const renderTablesHeaders = projectsTableHeaders.map((header) => (
    <TableHead
      className="h-[18px] py-3 uppercase text-lightGray_three text-xs whitespace-nowrap"
      key={header}
    >
      {header}
    </TableHead>
  ));

  const handleRowClick = (id: string) => {
    navigate(Green_Bounty_Routes.project(id));
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
          {data.map((project, index) => {
            const {
              _id,
              // user_id,
              project_number,
              project_name,
              location,
              start_date,
              duration,
              project_type,
            } = project;
            return (
              <TableRow
                key={project_number}
                onClick={() => handleRowClick(_id)}
                className={`border-none cursor-pointer font-medium text-lightGray_three ${
                  index % 2 === 0
                    ? "bg-white hover:bg-white/75"
                    : "bg-lightGreen hover:bg-lightGreen/75"
                }`}
              >
                <TableCell className="whitespace-nowrap">
                  {project_number}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {/* {user} */}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {project_name}
                </TableCell>
                <TableCell className="whitespace-nowrap text-black">
                  {truncateText(project_name ?? "", 20)}
                </TableCell>
                <TableCell className="whitespace-nowrap">{location}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(start_date)}
                </TableCell>
                <TableCell className="whitespace-nowrap">{duration}</TableCell>
                <TableCell className="whitespace-nowrap capitalize">
                  {/* {durationType} */}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {project_type}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
