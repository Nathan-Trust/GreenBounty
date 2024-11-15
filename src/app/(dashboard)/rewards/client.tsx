import AddWithdrawalAccount from "@/components/rewards/modal/AddWithdrawalAccount";
import ShareRewards from "@/components/rewards/modal/ShareRewards";
// import TransferEcoCoin from "@/components/rewards/modal/TransferEcoCoin";
import WithdrawEcoCoin from "@/components/rewards/modal/WithdrawEcoCoin";
import RewardCarousel from "@/components/rewards/RewardCarousel";
import RewardsBarChart from "@/components/rewards/RewardsBarChart";
import CustomDialog from "@/components/shared/CustomDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useStore } from "@/store/user";
import { useAccountStore } from "@/store/wallet";
import {
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  Share,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";

export interface MonthlyRewardData {
  month: string;
  reward: number;
}

export interface DataByRange {
  year: MonthlyRewardData[];
}

const dataByRange: DataByRange = {
  year: [
    { month: "Jan", reward: 55 },
    { month: "Feb", reward: 45 },
    { month: "Mar", reward: 15 },
    { month: "Apr", reward: 75 },
    { month: "May", reward: 30 },
    { month: "June", reward: 5 },
    { month: "July", reward: 60 },
    { month: "Aug", reward: 40 },
    { month: "Sept", reward: 20 },
    { month: "Oct", reward: 10 },
    { month: "Nov", reward: 80 },
    { month: "Dec", reward: 90 },
  ],
};

const RewardsClient = () => {
  const {userData}= useStore()
  const [dialogOpen, setDialogOpen] = useState({
    transfer: false,
    withdraw: false,
    addAccount: false,
  });
  const [shareOpen, setShareOpen] = useState(false);
  const [lastDialog, setLastDialog] = useState<keyof typeof dialogOpen | null>(
    null
  );

  const { fetchAccounts, accounts } = useAccountStore();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if ((accounts?.data?.length ?? 0) > 0 && lastDialog !== null) {
      setDialogOpen((prev) => ({
        ...prev,
        [lastDialog]: true,
        addAccount: false,
      }));
      setLastDialog(null);
    }
  }, [accounts?.data, lastDialog]);

  const closeAllDialogs = () => {
    setDialogOpen({
      transfer: false,
      withdraw: false,
      addAccount: false,
    });
  };

  const handleCloseAddAccountDialog = () => {
    if (accounts?.data?.length === 0) {
      closeAllDialogs();
    } else {
      setDialogOpen((prev) => ({ ...prev, addAccount: false }));
    }
  };

  const handleOpenDialog = (type: keyof typeof dialogOpen) => {
    setDialogOpen((prev) => ({
      ...prev,
      [type]: !prev[type], // Toggle the value of dialogOpen[type]
    }));
  };

  return (
    <div className="grid grid-cols-12 p-1.5 mini-md:p-6 max-w-screen-lg mx-auto gap-4 mini-md:gap-6">
      <RewardCarousel />
      <Card className="col-span-12 md:col-span-6 lg:col-span-5 border bg-white border-[#548235]">
        <CardContent className="flex gap-4 items-start p-4">
          <div className="bg-[#548235] text-white w-12 h-12 flex items-center rounded-md justify-center">
            <ChartNoAxesColumnIncreasing />
          </div>
          <div>
            <p className="">Total Profit</p>
            <p className="text-sm text-muted-foreground">
              January 2024-June 2024
            </p>
            <p className="text-xl font-medium">$20,000</p>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-12 md:col-span-6 lg:col-span-5 border bg-white border-[#548235]">
        <CardContent className="flex gap-4 items-start p-4">
          <div className="bg-[#548235] text-white w-12 h-12 flex items-center rounded-md justify-center">
            <CircleDollarSign />
          </div>
          <div>
            <p className="">Eco-coin balance</p>
            <p className="text-xl font-medium">{userData?.wallet ?? 0}</p>
          </div>
        </CardContent>
      </Card>
      <div className="col-span-12 lg:col-span-2 gap-3">
        {/* lg:justify-between lg:gap-0*/}
        <div className="flex gap-3  lg:flex-col  h-full">
          {/* Later Implementation */}
          {/* <CustomDialog
            open={dialogOpen.transfer}
            onOpenChange={() => handleOpenDialog("transfer")}
            triggerComponent={
              <Button className="w-fit lg:w-full h-[28px] rounded-sm text-xs flex justify-start bg-white border border-[#548235] text-[#548235] hover:bg-white gap-1">
                <ChartNoAxesColumnIncreasing size={15} />
                Transfer
              </Button>
            }
            // className="w-full"
          >
            <TransferEcoCoin />
          </CustomDialog> */}

          <CustomDialog
            open={dialogOpen.withdraw}
            onOpenChange={() => handleOpenDialog("withdraw")}
            triggerComponent={
              <Button className="w-fit lg:w-full h-[28px] rounded-sm text-xs flex justify-start bg-white border border-[#548235] text-[#548235] hover:bg-white gap-1">
                <Share size={15} /> Withdraw
              </Button>
            }
          >
            <WithdrawEcoCoin />
          </CustomDialog>

          <CustomDialog
            open={shareOpen}
            onOpenChange={() => setShareOpen(!shareOpen)}
            triggerComponent={
              <Button className="w-fit lg:w-full h-[28px] rounded-sm text-xs flex justify-start gap-1">
                <Share2 size={15} /> Share
              </Button>
            }
          >
            <ShareRewards />
          </CustomDialog>
        </div>
      </div>
      <RewardsBarChart dataByRange={dataByRange} chartTitle="Rewards" />

      {/* Additional dialog for missing account */}
      <Dialog
        open={dialogOpen.addAccount}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            setDialogOpen((prev) => ({ ...prev, addAccount: isOpen }));
          } else {
            handleCloseAddAccountDialog();
          }
        }}
      >
        <DialogContent>
          <AddWithdrawalAccount
            setOpen={() =>
              setDialogOpen((prev) => ({ ...prev, addAccount: false }))
            }
          />{" "}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardsClient;
