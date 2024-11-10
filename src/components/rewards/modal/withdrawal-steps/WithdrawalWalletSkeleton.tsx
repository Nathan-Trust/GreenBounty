import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface WithdrawalWalletSkeletonProps {
  length: number;
  children?: React.ReactNode;
}

export const WithdrawalWalletSkeleton: React.FC<WithdrawalWalletSkeletonProps> = ({
  length,
  children,
}) => {
  const renderSkeletonRows = Array.from({ length }).map((_, index) => (
    <div
      key={index}
      className="p-4 rounded-xl bg-[#548235] cursor-pointer md:order-1"
      style={{
        background:
          "linear-gradient(231deg, #548235 27.7%, rgba(18, 28, 11, 0.80) 119.68%)",
      }}
    >
      <div className="flex flex-col pt-4 h-[190px] justify-between pb-2 md:pb-0">
        {/* Bank Name */}
        <div className="text-lg flex gap-x-10 items-center">
          <Skeleton className="w-20 h-3" /> {/* Skeleton for bank name */}
        </div>

        {/* Account Number */}
        <p className="mt-4 text-2xl">
          <Skeleton className="w-40 h-4" /> {/* Skeleton for account number */}
        </p>

        {/* Account Name and Avatar */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-24 h-4" /> {/* Skeleton for account name */}
          </div>

          {/* Circular Icons */}
          <div className="relative h-20 w-[105px]">
            <Skeleton className="absolute w-16 h-16 rounded-full z-10 bg-[#93B77C]" />
            <Skeleton className="absolute w-16 h-16 z-20 rounded-full left-10 bg-[#7CAB5CA6]" />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="relative col-span-3">
      {children}
      <div className="grid grid-cols-1 gap-3">{renderSkeletonRows}</div>
    </div>
  );
};
