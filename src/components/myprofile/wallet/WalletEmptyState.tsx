import Lottie from "react-lottie";
import animationData from "../../../assets/lotties/empty-project.json"

const WalletEmptyState = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto   rounded-md w-full col-span-3">
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
};

export default WalletEmptyState;
