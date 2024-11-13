import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/tick2.json";
import { useBasketStore } from "@/store/basket"; // Import the Zustand store

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const TransactionReceipt: React.FC = () => {
  const { transactionDetails } = useBasketStore();

  if (!transactionDetails) return null;

  return (
    <div>
      <div className="bg-transparent w-[70px] mx-auto flex items-center justify-center h-[70px] rounded-full border border-primary">
        <Lottie options={defaultOptions} height={50} width={50} />
      </div>
      <p className="text-center text-xl mt-3 font-medium">Payment Success</p>
      <h2 className="mt-5">Transaction Receipt</h2>
      <p>
        <strong>Transaction ID:</strong> {transactionDetails?._id}
      </p>
      <p>
        <strong>Reference:</strong> {transactionDetails?.reference}
      </p>
      <div className="border border-dashed my-3" />
      <p>
        <strong>Status:</strong> {transactionDetails?.status}
      </p>
      <p>
        <strong>Amount:</strong> {transactionDetails?.totalAmount}
      </p>
      <div className="border border-dashed my-3" />
    </div>
  );
};

export default TransactionReceipt;
