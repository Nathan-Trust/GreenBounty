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
import { pickupTableHeaders } from "@/store/pickup";

interface PickupTableSkeletonProps {
  length: number;
  children?: React.ReactNode;
}

export const PickupTableSkeleton: React.FC<
  PickupTableSkeletonProps
> = ({ length, children }) => {
  const renderTableHeaders = pickupTableHeaders.map((header) => (
    <TableHead key={header} className="h-[18px] py-3">
      <Skeleton
        className={`${header === "ID" ? "w-10" : "w-24"} h-4  bg-primary/10`}
      />
    </TableHead>
  ));

  const renderSkeletonRows = Array.from({ length }).map((_, index) => (
    <TableRow
      key={index}
      className={`group border-b  last:border-none text-[#1C2024] py-2 cursor-pointer ${
        index % 2 === 0
          ? "bg-white hover:bg-white/75"
          : "bg-lightGreen hover:bg-lightGreen/75"
      } transition-colors data-[state=selected]:bg-muted `}
    >
      <TableCell className="py-4 space-y-2">
        <Skeleton className="h-2.5 w-20" />
        <Skeleton className="h-2.5 w-10" />
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
    </TableRow>
  ));

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto border rounded-md specialScrollbar   w-full col-span-3">
      {children}
      <Table>
        <TableHeader className="bg-[#00005506]  border-b text-[#1C2024]">
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
