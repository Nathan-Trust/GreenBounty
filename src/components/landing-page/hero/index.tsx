// import Navbar from "../navbar";
import heroImg from "../../../assets/landing-page/Image.png";
import { Button } from "@/components/ui/button";
import GreenBountyRates from "../rating";
import { motion } from "framer-motion";
import { Green_Bounty_Routes } from "@/store/route";
import { useNavigate } from "react-router-dom";

const fadeInVariants = {
  hidden: { opacity: 0, x: -20 }, // Initial state
  visible: { opacity: 1, x: 0 }, // Final state
};

const HeroSection = () => {
    const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col screen-max-width pb-20">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center z-20">
        <div className="px-4 lg:px-0">
          <motion.h2
            className="text-4xl lg:text-5xl font-semibold"
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} // Adds easing
          >
            GreenBounty: Revolutionizing Waste Management
          </motion.h2>

          <motion.p
            className="text-lg mt-2.5"
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5, delay: 0.5 }} // Delayed for staggered effect
          >
            GreenBounty is a waste-to-reward web app that incentivizes recycling.
            Earn points for every item recycled and redeem rewards from
            sustainable brands.
          </motion.p>
          <div className="mt-2.5 flex flex-col items-center md:items-start w-full">
            <Button className="w-full md:w-fit" onClick={()=> navigate(Green_Bounty_Routes.signUp)}>
              Join Green Bounty
            </Button>
          </div>
        </div>
        <img src={heroImg} alt="hero-img" className="md:w-1/2" />
      </div>
      <GreenBountyRates />
    </div>
  );
};

export default HeroSection;
