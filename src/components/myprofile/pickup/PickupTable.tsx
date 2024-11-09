import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pickupTableHeaders } from "@/store/pickup";

export const pickupSampleData = [
  {
    id: 1,
    item: {
      name: "Plastic Bag",
      number: 20,
      time: "12:00pm",
      date: "21/8/2024",
    },
  },
  {
    id: 2,
    item: {
      name: "Metal Can",
      number: 15,
      time: "1:00pm",
      date: "22/8/2024",
    },
  },
];

const PickupTable: React.FC = () => {
  const renderTablesHeaders = pickupTableHeaders.map((header) => (
    <TableHead
      className="h-[18px] py-2 uppercase text-lightGray_three text-xs whitespace-nowrap"
      key={header}
    >
      {header}
    </TableHead>
  ));

  return (
    <div className="relative mt-5 border rounded-md overflow-x-auto specialScrollbar ">
      <Table className=" ">
        <TableHeader className="bg-[#00005506]  border-b text-[#1C2024]">
          <TableRow className="border-none  hover:bg-transparent">
            {renderTablesHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {pickupSampleData?.map((data, index: number) => {
            const { id, item } = data;
            return (
              <TableRow
                key={id}
                className={`border-b  last:border-none  text-[#1C2024] ${
                  index % 2 === 0
                    ? "bg-white hover:bg-white/75"
                    : "bg-lightGreen hover:bg-lightGreen/75"
                } `}
              >
                <TableCell className="whitespace-nowrap  text-[#1C2024] py-2.5">
                  <p>{id}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap py-2.5">{item.name}</TableCell>
                <TableCell className="whitespace-nowrap py-2.5">
                  {item.number}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2.5">{item.time}</TableCell>
                <TableCell className="whitespace-nowrap py-2.5">{item.date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PickupTable;
