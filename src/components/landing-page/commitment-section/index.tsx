import { Button } from "@/components/ui/button";
import commitmentImg from "../../../assets/landing-page/commitment.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Green_Bounty_Routes } from "@/store/route";

// Define fade-in animation variants
const fadeInVariants = {
  hidden: { opacity: 0, x: 20 }, // Initial state (invisible and moved to the right)
  visible: { opacity: 1, x: 0 }, // Final state (visible and centered)
};

const CommitmentSection = () => {
  const navigate = useNavigate()
  return (
    <div  className="h-fit bg-[#d3d3d3] w-full">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between screen-max-width px-4 py-5 lg:px-0">
        <img src={commitmentImg} alt="commitment" className="md:w-[40%]" />
        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="lg:w-[430px]">
            <motion.h2
              className="text-4xl lg:text-5xl font-semibold"
              initial="hidden"
              whileInView="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.5, delay: 0.3 }} // Adjust duration and delay as needed
            >
              GreenBounty and Sustainability{" "}
            </motion.h2>
            <motion.p
              className="text-lg mt-2.5"
              initial="hidden"
              whileInView="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.5, delay: 0.5 }} // Slightly delayed for staggered effect
            >
              GreenBounty is committed to sustainability. Our platform supports
              a circular economy and reduces waste through innovative recycling
              solutions.
            </motion.p>
            <Button
              className="w-full md:w-fit mt-3"
              onClick={() => navigate(Green_Bounty_Routes.signUp)}
            >
              Join GreenBounty Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitmentSection;
