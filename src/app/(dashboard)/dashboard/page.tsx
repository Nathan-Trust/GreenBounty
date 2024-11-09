import { useStore } from "@/store/user";
import DashboardClient from "./client";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { userData } = useStore();

  return (
    <div className="h-full w-full">
      <motion.p
        className="ml-6 mt-5 text-lg font-semibold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration:0.6, ease: "easeOut" }}
      >
        Hey {userData?.name},
      </motion.p>
      <DashboardClient />
    </div>
  );
};

export default Dashboard;
