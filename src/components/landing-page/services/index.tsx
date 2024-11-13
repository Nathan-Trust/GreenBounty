import { motion } from "framer-motion";

const servicesData = [
  { name: "Collect", imageSrc: "/path-to-image/collect.png" },
  { name: "Track", imageSrc: "/path-to-image/track.png" },
  { name: "Reward", imageSrc: "/path-to-image/reward.png" },
  { name: "Redeem", imageSrc: "/path-to-image/redeem.png" },
  { name: "Recycle", imageSrc: "/path-to-image/recycle.png" },
  { name: "Dispose", imageSrc: "/path-to-image/dispose.png" },
  { name: "Impact", imageSrc: "/path-to-image/impact.png" },
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
            className="h-32 w-32 rounded-md p-4 flex flex-col justify-end bg-primary/5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: index * 0.5 },
            }}
          >
            {/* <img
              src={service.imageSrc}
              alt={service.name}
              className="w-12 h-12 mx-auto"
            /> */}
            <p className="font-medium text-md text-center">{service.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
