import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface RecycablesSkeletonProps {
  length: number;
}

export const RecycablesSkeleton: React.FC<RecycablesSkeletonProps> = ({
  length,
}) => {
  const renderSkeletonRows = Array.from({ length }).map((_, index) => (
    <div key={index} className="flex items-center justify-between p-3 border-t">
      <div className="flex-grow">
        {/* Item name and delete icon */}
        <div className="flex justify-between items-center">
          <Skeleton className="w-24 h-4" /> {/* Skeleton for item name */}
          <Skeleton className="w-4 h-4 text-gray-300" />{" "}
          {/* Skeleton for delete icon */}
        </div>

        {/* Quantity input and edit button */}
        <div className="relative mt-2 flex items-center">
          <Skeleton className="w-full h-8 rounded" />{" "}
          {/* Skeleton for quantity input */}
          <Skeleton className="absolute right-1 w-16 h-8 rounded flex items-center" />{" "}
          {/* Skeleton for button */}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="space-y-4 rounded-lg mt-5 col-span-3">
      <p>Hi there, bounty hunter! 🏹 How was the hunt today? 🌿</p>
      {renderSkeletonRows}
    </div>
  );
};

export default RecycablesSkeleton;
