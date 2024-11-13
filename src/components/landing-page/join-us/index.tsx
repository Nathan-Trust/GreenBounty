import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import joinusnowimg from "../../../assets/landing-page/joinusnow.png";

const JoinUsNow = () => {
  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="bg-[#fdfefd]">
      <div className="flex flex-col md:flex-row items-center px-4 py-4 screen-max-width">
        <div className="lg:w-1/2  flex items-center justify-center">
          <div className="w-full">
            <motion.h2
              className="text-4xl lg:text-5xl font-semibold"
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              transition={{ duration: 0.5, delay: 0.3 }}
              // viewport={{ once: true, amount: 0.5 }}
            >
              Start recycling
            </motion.h2>
            <motion.p
              className="text-lg mt-2.5"
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              transition={{ duration: 0.5, delay: 0.5 }}
              // viewport={{ once: true, amount: 0.5 }}
            >
              Discover the rewards of recycling, earn points & redeem rewards
              for sustainable choices.
            </motion.p>
            <Button className=" w-full md:w-fit mt-3">
              Join GreenBounty Now
            </Button>
          </div>
        </div>
        <img src={joinusnowimg} alt="joinusnow" className="md:w-1/2" />
      </div>
    </div>
  );
};

export default JoinUsNow;
