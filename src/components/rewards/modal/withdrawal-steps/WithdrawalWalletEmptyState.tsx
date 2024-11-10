import Lottie from "react-lottie";
import animationData from "../../../../assets/lotties/empty-project.json";

const WithdrawalWalletEmptyState = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto rounded-md w-full col-span-3">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default WithdrawalWalletEmptyState;
