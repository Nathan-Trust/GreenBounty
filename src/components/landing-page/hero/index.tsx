import Navbar from "../navbar";
import heroImg from "../../../assets/landing-page/Image.png";
import { Button } from "@/components/ui/button";
import GreenBountyRates from "../rating";
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, x: -20 }, // Initial state
  visible: { opacity: 1, x: 0 }, // Final state
};

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col bg-center bg-cover screen-max-width pb-20">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-16 z-20">
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
            GreenBounty is a waste-to-reward app that incentivizes recycling.
            Earn points for every item recycled and redeem rewards from
            sustainable brands.
          </motion.p>
          <div className="mt-2.5 flex flex-col items-center md:items-start w-full">
            <Button className="bg-[#2196F3] w-full md:w-fit">
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
