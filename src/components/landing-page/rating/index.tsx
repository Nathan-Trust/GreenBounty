import { useRef } from "react";
import { motion } from "framer-motion";
import useAnimatedNumber from "@/utils/numbers/useAnimatedNumbers";

const GreenBountyRates: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Final values for animation
  const finalRewardsBalance = 1234;
  const finalCurrentRewardsRate = 5;
  const finalTotalItemsRecycled = 5678;
  const finalRecyclingRate = 75.2;

  // Use the custom hook to animate numbers only when in view
  const rewardsBalance = useAnimatedNumber(ref, finalRewardsBalance);
  const currentRewardsRate = useAnimatedNumber(ref, finalCurrentRewardsRate);
  const totalItemsRecycled = useAnimatedNumber(ref, finalTotalItemsRecycled);
  const recyclingRate = useAnimatedNumber(ref, finalRecyclingRate);

  return (
    <div ref={ref} className="w-full grid  mt-4  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center p-4">
      <div className="text-center  w-full">
        <p className="font-semibold text-lg">Rewards Balance</p>
        <motion.p
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {rewardsBalance} points
        </motion.p>
      </div>
      <div className="text-center w-full">
        <p className="font-semibold text-lg">Current Rewards Rate</p>
        <motion.p
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {currentRewardsRate}%
        </motion.p>
      </div>
      <div className="text-center w-full">
        <p className="font-semibold text-lg">Total Items Recycled</p>
        <motion.p
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {totalItemsRecycled} items
        </motion.p>
      </div>
      <div className="text-center w-full">
        <p className="font-semibold text-lg">Recycling Rate</p>
        <motion.p
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {recyclingRate}%
        </motion.p>
      </div>
    </div>
  );
};

export default GreenBountyRates;
