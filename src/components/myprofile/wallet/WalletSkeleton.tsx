import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface WalletSkeletonProps {
  length: number;
  children?: React.ReactNode;
}

export const WalletSkeleton: React.FC<WalletSkeletonProps> = ({
  length,
  children,
}) => {
  const renderSkeletonRows = Array.from({ length }).map((_, index) => (
    <div key={index} className="p-4 rounded-lg flex gap-3 border">
      <Skeleton className="w-16 h-16 rounded-md" /> {/* Avatar skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="w-20 h-4" /> {/* Account number skeleton */}
        <Skeleton className="w-20 h-4" /> {/* Account name skeleton */}
      </div>
    </div>
  ));

  return (
    <div className="relative  col-span-3">
      {children}
      <div className="grid grid-cols-1 gap-3 ">
        {renderSkeletonRows}
      </div>
    </div>
  );
};
