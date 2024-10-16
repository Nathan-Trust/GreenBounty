// import sih from "../../../assets/landing-page/image 3.png";
// import aktw from "../../../assets/landing-page/image 4.png";
// import ibom from "../../../assets/landing-page/image 5.png";
// import Marquee from "react-fast-marquee"; // Importing react-fast-marquee

// const partnersLogo = [sih, aktw, ibom];

const PartnersSection = () => {
  return (
    <div className="bg-[#4A4A4A] h-fit w-full py-6">
      {/* <Marquee
        gradient={false} // Removes the fade effect at the edges
        speed={50} // Adjusts the speed of the scrolling
        className="flex space-x-12 items-center"
      >
        {partnersLogo.map((partner, index) => ( 
          <img
            src={partner}
            alt={`Partner logo ${index + 1}`}
            key={index}
            className="h-[80px] object-contain"
          />
        ))}
        {partnersLogo.map((partner, index) => (
          <img
            src={partner}
            alt={`Partner logo ${index + 1}`}
            key={index}
            className="h-[80px] object-contain"
          />
        ))}
      </Marquee> */}
    </div>
  );
};

export default PartnersSection;
