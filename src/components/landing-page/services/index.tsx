import { motion } from "framer-motion";
import collect from "../../../assets/icons/fluent_collections-16-regular.svg";
import track from "../../../assets/icons/material-symbols-light_art-track-outline.svg";
import reward from "../../../assets/icons/marketeq_reward.svg";
import redeem from "../../../assets/icons/material-symbols-light_redeem.svg";
import recycle from "../../../assets/icons/ph_recycle-light.svg";
import dispose from "../../../assets/icons/guidance_bin-throw-person.svg";
import impact from "../../../assets/icons/game-icons_impact-point.svg";

const servicesData = [
  {
    name: "Collect",
    imageSrc: collect,
  },
  {
    name: "Track",
    imageSrc: track,
  },
  {
    name: "Reward",
    imageSrc: reward,
  },
  {
    name: "Redeem",
    imageSrc: redeem,
  },
  {
    name: "Recycle",
    imageSrc: recycle,
  },
  {
    name: "Dispose",
    imageSrc: dispose,
  },
  {
    name: "Impact",
    imageSrc: impact,
  },
];

const Services = () => {
  return (
    <div id="services" className="screen-max-width px-4 py-5 md:py-16 gap-4">
      <div className="w-fit">
        <p>WHAT SERVICES DO WE OFFER IN GREENBOUNTY</p>
        <p className="text-xl font-semibold">Services</p>
      </div>
      <div className="flex flex-wrap mt-4 gap-4">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            className="h-32 w-32 rounded-md p-4 flex flex-col justify-between bg-primary/5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: index * 0.5 },
            }}
          >
            <img
              src={service.imageSrc}
              alt={service.name}
              className="w-12 h-12 mx-auto"
            />
            <p className="font-medium text-md text-center">{service.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
