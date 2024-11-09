import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import CustomDialog from "@/components/shared/CustomDialog";
import { useAccountStore } from "@/store/wallet";
import AddWithdrawalAccount from "@/components/rewards/modal/AddWithdrawalAccount";
import { WalletSkeleton } from "@/components/myprofile/wallet/WalletSkeleton";
import WalletEmptyState from "@/components/myprofile/wallet/WalletEmptyState";
import WalletDetails from "@/components/myprofile/wallet/Wallet";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import sampleCurrency from "../../../assets/dashboard/usa.png"
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

const Wallet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { loading, fetchAccounts, accounts } = useAccountStore();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null); // State to track the selected account
  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="p-0 pb-6 md:p-6">
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            Payment settings Manage your default payment method
          </CardDescription>
        </CardHeader>
        <div className="p-0 pb-6 md:p-6 pt-0 lg:pt-6 flex flex-col md:flex-row md:justify-between">
          <div>
            <p>Currency</p>
            <p>Manage your default currency</p>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="p-2 flex flex-1 bg-[#F5F5F5] justify-between items-center lg:gap-16  rounded-md border border-[#E5E7EB]">
              <div className="flex items-center gap-1.5 ">
                <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                  <AvatarImage
                    src={sampleCurrency}
                    className="h-full w-full object-cover"
                  />
                </Avatar>
                <div className="text-xs">
                  <p className="text-sm">USD</p>
                  <p className="text-[#A3A3A3] truncate">US Dollar</p>
                </div>
              </div>
              <div className="text-xs">
                <p>$0.9999</p>
                <p className="mt-0.5 hidden md:block whitespace-nowrap">
                  1 EcoCoin = 0.009USD
                </p>
              </div>
            </div>
            <Button size="sm">Update</Button>
          </div>
        </div>
        <CardContent className="border-t border-b flex flex-col lg:flex-row py-8 gap-4 p-0 md:p-6">
          <div>
            <p>Withdrawal methods</p>
            <p>Manage your default withdrawal method</p>

            <CustomDialog
              open={open}
              onOpenChange={() => setOpen(!open)}
              triggerComponent={
                <Button className="mt-5 text-[#FFFFFF] px-8 shadow-none border-none outline-none focus:ring-0">
                  Add Withdrawal Account
                </Button>
              }
            >
              <AddWithdrawalAccount setOpen={setOpen} />
            </CustomDialog>
          </div>
          <div className="flex-1 mt-6 lg:mt-0">
            <FetchLoadingAndEmptyState
              isLoading={loading}
              numberOfSkeleton={1}
              skeleton={<WalletSkeleton length={3} />}
              emptyState={<WalletEmptyState />}
              data={accounts?.data.length}
            >
              <WalletDetails
                setSelectedAccount={setSelectedAccount}
                selectedAccount={selectedAccount}
                account={accounts}
                setOpen={setOpen}
              />
            </FetchLoadingAndEmptyState>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;
