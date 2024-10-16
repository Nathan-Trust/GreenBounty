import { CustomCardContent } from "@/components/shared/CustomCardHeader";
import { motion } from "framer-motion";
import image1 from "../../../../assets/sample/life-on-land.jpg";
import image2 from "../../../../assets/sample/gallery-image-five.jpg";
import image3 from "../../../../assets/sample/gallery-image-four.jpg";
import image4 from "../../../../assets/sample/gallery-image-three.jpg";
import { Calendar } from "lucide-react";

const ProjectGallery = () => {
  const data = [
    {
      when: "Today",
      images: [
        {
          id: 1,
          imgSrc: image1,
        },
        {
          id: 2,
          imgSrc: image2,
        },
        {
          id: 3,
          imgSrc: image3,
        },
        {
          id: 5,
          imgSrc: image1,
        },
        {
          id: 4,
          imgSrc: image4,
        },
        {
          id: 6,
          imgSrc: image2,
        },
      ],
    },
    {
      when: "20th September,2023",
      images: [
        {
          id: 1,
          imgSrc: image1,
        },
        {
          id: 2,
          imgSrc: image2,
        },
        {
          id: 3,
          imgSrc: image3,
        },
        {
          id: 5,
          imgSrc: image1,
        },
        {
          id: 4,
          imgSrc: image4,
        },
        {
          id: 6,
          imgSrc: image2,
        },
      ],
    },
  ];

  return (
    <CustomCardContent
      title="Project Gallery"
      description="All project images and attachments"
      className="overflow-y-auto h-[700px]"
    >
      <motion.div className=" relative  mt-5">
        <div className=" flex flex-col space-y-16">
          {data.map((item) => (
            <div key={item.when} className="flex flex-col ">
              <p className="flex text-xs gap-1 items-center font-medium">
                <Calendar size={13} /> {item.when}
              </p>
              <div className="mt-6  gallery">
                {item.images.map((image) => (
                  <div
                    key={image.id}
                    className="pics relative overflow-hidden group rounded-md"
                  >
                    <img
                      src={image.imgSrc}
                      alt=""
                      style={{ width: "100%" }}
                      className="group-hover:scale-150 transition-transform duration-300 ease-in-out"
                    />
                    <div className="absolute inset-0 z-10 w-full h-full hero-gradient" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </CustomCardContent>
  );
};

export default ProjectGallery;
