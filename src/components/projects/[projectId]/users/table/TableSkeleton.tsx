import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { projectUsersTableHeaders } from "@/store/projects";

interface TableSkeletonProps {
  length: number;
  children?: React.ReactNode;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  length,
  children,
}) => {
  const renderTableHeaders = projectUsersTableHeaders.map((header) => (
    <TableHead key={header} className="h-[18px] py-3">
      <Skeleton
        className={`${header === "ID" ? "w-10" : "w-24"} h-4  bg-lightGray`}
      />
    </TableHead>
  ));

  const renderSkeletonRows = Array.from({ length }).map((_, index) => (
    <TableRow
      key={index}
      className={`group border-none py-2 cursor-pointer ${
        index % 2 === 0
          ? "bg-white hover:bg-white/75"
          : "bg-lightGreen hover:bg-lightGreen/75"
      } transition-colors data-[state=selected]:bg-muted `}
    >
      <TableCell className="py-4">
        <Skeleton className="h-4 w-10" />
      </TableCell>
      <TableCell className="py-4">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-4">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-4">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-4">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-4">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-4">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className=" py-4">
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell className=" py-4">
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell className=" py-4">
        <Skeleton className="h-4 w-20" />
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto  w-full col-span-3">
      {children}
      <Table>
        <TableHeader className="bg-lightGreen">
          <TableRow className="border-none hover:bg-transparent">
            {renderTableHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {renderSkeletonRows}
        </TableBody>
      </Table>
    </div>
  );
};
