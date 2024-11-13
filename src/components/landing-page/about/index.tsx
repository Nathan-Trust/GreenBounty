import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  // Array of items to display
  const items = [
    {
      id: 1,
      bgColor: "bg-gray-200",
      title: "Reliable Quality",
      description:
        "Green Bounty ensures high standards in all our products and services. Our commitment to quality means you can trust that every item is crafted with care and built to last.",
    },
    {
      id: 2,
      bgColor: "bg-primary/20",
      title: "Trusted Expertise",
      description:
        "With years of experience, Green Bounty brings trusted expertise to sustainable solutions. Our team is dedicated to guiding you with knowledge and precision for a greener future.",
    },
    {
      id: 3,
      bgColor: "bg-[#fdeef2]",
      title: "Sustainable Impact",
      description:
        "We are committed to making a positive environmental impact. Green Bounty products and practices are designed to reduce waste, conserve resources, and promote sustainability.",
    },
    {
      id: 4,
      bgColor: "bg-[#daedf7]",
      title: "Community Engagement",
      description:
        "Green Bounty believes in building strong, sustainable communities. We partner with local groups and initiatives to support environmental awareness and positive social impact.",
    },
  ];


  // Define animation variants for staggered appearance
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.5, duration: 0.8 },
    }),
  };

  return (
    <div className="bg-[#fdfefd]">
      <div id="about-us" className="screen-max-width px-4  py-5 md:py-16 gap-4">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="w-fit">
            <p>ABOUT GREENBOUNTY</p>
            <p className="text-xl font-semibold">About Us</p>
          </div>
          <div className="lg:w-[62%] mt-8 lg:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex flex-col items-start"
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    exit="hidden"
                  >
                    <div className={`w-16 h-16 rounded-md ${item.bgColor}`} />
                    <p className="text-md font-medium mt-1.5">{item.title}</p>
                    <p className="text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
