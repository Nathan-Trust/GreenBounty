import { useAccountStore } from "@/store/wallet";
import animationData from "../../../../assets/lotties/tick2.json";
import Lottie from "react-lottie";
import { formatPaymentMethod } from "@/utils/text";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const StepThree = () => {
  const { withdrawalResponse } = useAccountStore();

  // Destructure the withdrawal response to get the relevant details
  const {  paymentMethod, reference } =
    withdrawalResponse?.data || {};
  

  return (
    <div className="space-y-6 p-4">
      {/* Lottie Animation */}
      <div className="bg-transparent w-[70px] mx-auto flex items-center justify-center h-[70px] rounded-full border border-primary">
        <Lottie options={defaultOptions} height={50} width={50} />
      </div>

      {/* Display Withdrawal Status */}
      <div className="text-center">
        <p className="text-xl font-semibold text-primary">
          {withdrawalResponse?.success
            ? "Withdrawal Successful"
            : "Withdrawal Failed"}
        </p>
      </div>

      {/* Details Section */}
      {withdrawalResponse && (
        <div className="bg-gray-100 p-4 rounded-md mt-4">
          <h4 className="font-medium text-lg text-gray-800">
            Withdrawal Details
          </h4>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Amount: </strong>N{withdrawalResponse?.data?.totalAmount}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Payment Method: </strong>
              {formatPaymentMethod(paymentMethod ?? "")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Reference: </strong>
              {reference}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepThree;
