import Lottie from "react-lottie";
import animationData from "../../../assets/lotties/empty-project.json";

const RecycablesEmptyState = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto rounded-md w-full h-full flex flex-col gap-2 items-center justify-center col-span-3">
      <Lottie options={defaultOptions} height={200} width={200} />
      <p>No recycable found</p>
    </div>
  );
};

export default RecycablesEmptyState;
