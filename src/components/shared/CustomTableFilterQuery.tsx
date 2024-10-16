import React from "react";
import { LayoutGrid, Menu, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { Input } from "../ui/input";

interface CustomTableFilterQueryProps {
  searchTerm?: string; // Made optional
  setSearchTerm?: (value: string) => void; // Made optional
  rowsPerPage?: number; // Made optional
  setRowsPerPage?: (value: number) => void; // Made optional
  activeView?: "menu" | "grid"; // Made optional
  setActiveView?: (view: "menu" | "grid") => void; // Made optional
}

// Define view options with their corresponding icons
const viewOptions = [
  { value: "menu", icon: <Menu className="h-4 text-black/85" /> },
  { value: "grid", icon: <LayoutGrid className="h-4 text-black/85" /> },
];

const CustomTableFilterQuery: React.FC<CustomTableFilterQueryProps> = ({
  searchTerm,
  setSearchTerm,
  rowsPerPage,
  setRowsPerPage,
  activeView,
  setActiveView,
}) => {
  return (
    <div className="flex justify-between w-full">
      {/* Search Input Field */}
      <div className="hidden md:flex items-center w-64 h-9 bg-[#f9fafb] pl-1 rounded-lg overflow-hidden gap-1">
        <Search className="h-4 text-lightGray_three" />
        <Input
          placeholder="Search list"
          value={searchTerm}
          onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)} // Optional chaining
          className="h-full border-none ring-0 flex-1 outline-none placeholder:text-lightGray_three bg-transparent focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
        />
      </div>

      {/* Rows per Page and Other Actions */}
      <div className="flex gap-3 justify-end  w-full">
        <div className="flex items-center  gap-3">
          <p className="text-xs font-semibold">Rows per page</p>
          <Select
            value={String(rowsPerPage)}
            onValueChange={(value) =>
              setRowsPerPage && setRowsPerPage(Number(value))
            } // Optional chaining
          >
            <SelectTrigger className="w-[67px] font-medium border-none bg-xtralightGray focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 outline-none">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="75">75</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Filters Button */}
        <div className="flex h-10 w-[88px] bg-xtralightGray gap-1 items-center rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none [&>span]:line-clamp-1">
          <PiSlidersHorizontalBold className="text-black/85" />
          <span className="font-medium">Filters</span>
        </div>

        {/* View Options (Menu / Grid Layout) */}
        <div className="hidden  md:flex h-10 w-fit  bg-xtralightGray gap-1 items-center rounded-md px-2 py-1 text-sm placeholder:text-muted-foreground focus:outline-none [&>span]:line-clamp-1">
          {viewOptions.map(({ value, icon }) => (
            <div
              key={value}
              onClick={() => setActiveView && setActiveView(value as "menu")} // Optional chaining
              className={`flex items-center p-1 rounded-md cursor-pointer ${
                activeView === value ? "bg-white" : ""
              }`}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomTableFilterQuery;
