// import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/shared/CustomDialog";
import { Accounts } from "@/store/wallet";
import AddWithdrawalAccount from "../../rewards/modal/AddWithdrawalAccount";
import { maskAccountNumber } from "@/utils/account-number";

interface WalletDetailsProps {
  account: Accounts | null;
  selectedAccount: string | null;
  setSelectedAccount: (_id: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WalletDetails: React.FC<WalletDetailsProps> = ({
  selectedAccount,
  setSelectedAccount,
  account,
  setOpen,
}) => {
  return (
    <div className="grid grid-cols-1  gap-3 ">
      {account?.data?.map((data) => {
        const isChecked = selectedAccount === data?._id; // Check if the current card is selected

        return (
          <div
            key={data._id}
            className={`p-6 rounded-lg flex border justify-between  cursor-pointer transition-transform duration-200 ease-in-out ${
              isChecked ? "border-2 border-blue-500" : ""
            } `} // Add hover effect
            onClick={() => setSelectedAccount(data._id)}
          >
            <div className="flex gap-2 items-center">
              <Input
                type="radio"
                id={`option-${data._id}`}
                name="withdrawalAccount"
                checked={isChecked}
                className="w-4 h-4"
                onChange={() => setSelectedAccount(data?._id)}
              />
              {/* {bankData && (
                <Avatar className="rounded-md overflow-hidden">
                  <AvatarImage
                    src={bankData.logo}
                    alt={bankData.alt}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
              )} */}
              <div>
                <p className="font-semibold text-sm">
                  {maskAccountNumber(data?.accountNumber)}
                </p>
                <p className="font-semibold text-md">{data?.accountName}</p>
              </div>
            </div>
            <CustomDialog
              triggerComponent={
                <Button
                  variant="outline"
                  size="sm"
                  className="border  bg-white shadow-none  hover:bg-white text-[#646464] flex justify-between items-center"
                >
                  {" "}
                  Edit
                </Button>
              }
            >
              <AddWithdrawalAccount
                editing
                setOpen={setOpen}
                selectedAccount={selectedAccount}
              />
            </CustomDialog>
          </div>
        );
      })}
    </div>
  );
};

export default WalletDetails;
