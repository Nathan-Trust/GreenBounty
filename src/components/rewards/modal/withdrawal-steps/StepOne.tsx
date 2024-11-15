import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { useAccountStore } from "@/store/wallet";
import { formatAccountNumber } from "@/utils/account-number";
import { truncateText } from "@/utils/text";
import { useEffect } from "react";
import { WithdrawalWalletSkeleton } from "./WithdrawalWalletSkeleton";
import WithdrawalWalletEmptyState from "./WithdrawalWalletEmptyState";
import { useStore } from "@/store/user";
import { convertCoinsToNGNCurrency } from "@/utils/currency";

interface StepOneProps {
  onSelectCard: (cardId: string) => void;
  selectedAccount: string | null;
}

const StepOne: React.FC<StepOneProps> = ({ onSelectCard, selectedAccount }) => {
  const { loading, fetchAccounts, accounts } = useAccountStore();
  const {userData}= useStore()

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div>
      <p>Available Balance</p>
      <p className="text-primary font-semibold text-2xl">
        {convertCoinsToNGNCurrency(userData?.wallet ?? 0)}
      </p>

      <p className="mt-4">Select Card</p>
      <div className="flex-1 mt-6 ">
        <FetchLoadingAndEmptyState
          isLoading={loading}
          numberOfSkeleton={1}
          skeleton={<WithdrawalWalletSkeleton length={3} />}
          emptyState={<WithdrawalWalletEmptyState />}
          data={accounts?.data.length}
        >
          <div className="flex flex-col gap-4">
            {accounts?.data?.map((data) => {
              const isSelected = selectedAccount === data?._id;
              return (
                <Card
                  key={data?._id}
                  onClick={() => {
                    onSelectCard(data?._id); // Handle card selection
                  }}
                  className={`cursor-pointer bg-[#548235] md:order-1 rounded-xl text-white ${
                    isSelected ? "border-2 border-primary" : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(231deg, #548235 27.7%, rgba(18, 28, 11, 0.80) 119.68%)",
                  }}
                >
                  <CardContent className="flex flex-col pt-4 h-[230px] justify-between pb-2 md:pb-0">
                    <div className="text-lg flex gap-x-10 items-center">
                      <p>{data?.bankName} </p>
                    </div>
                    <p className="mt-4 text-2xl ">
                      {formatAccountNumber(data?.accountNumber)}
                    </p>
                    <div className="flex justify-between items-center">
                      <p>
                        {truncateText(
                          data?.accountName.toUpperCase() ?? "",
                          20
                        )}
                      </p>
                      <div className="relative h-20 w-[105px]">
                        <div className="absolute w-16 h-16 rounded-full z-10 bg-[#93B77C]" />
                        <div className="absolute w-16 h-16 z-20 rounded-full left-10 bg-[#7CAB5CA6]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </FetchLoadingAndEmptyState>
      </div>
    </div>
  );
};

export default StepOne;
