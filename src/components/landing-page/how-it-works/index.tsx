import hiwOne from "../../../assets/landing-page/Collecting-amico.png"
import hiwTwo from "../../../assets/landing-page/Order ride-bro.png"
import hiwThree from "../../../assets/landing-page/Analytics-amico.png"

const items = [
  {
    number: "01",
    title: "Sign up and get a basket",
    description:
      "Register on our platform and receive a free basket to start collecting recyclable materials. We provide everything you need to make the process easy and convenient.",
  },
  {
    number: "02",
    title: "Schedule Pickup",
    description:
      "Once your basket is full, schedule a pickup at your convenience. Our team will come to your location, saving you the hassle of transportation.",
  },
  {
    number: "03",
    title: "Get Paid",
    description:
      "Earn rewards for your recyclables! We weigh your collection, and you receive payment based on the quantity and type of materials you’ve recycled.",
  },
];


const HowItWorks = () => {
  const images = [hiwOne , hiwTwo , hiwThree]
  return (
    <div className="screen-max-width px-4 py-5 md:py-16 gap-4">
      <div className="w-fit">
        <p>HOW DOES GREENBOUNTY WORK ?</p>
        <p className="text-xl font-semibold">How It Works</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6">
        {items.map((item, index) => (
          <div key={index}>
            <div className=" h-72">
              <img src={images[index]} alt={`illustration${index}`} className="w-full h-full object-cover"/>
            </div>
            <div className="relative  mt-4 p-4">
              <p
                className="absolute text-[6rem] font-bold text-primary/10 z-10 -top-8 left-0"
                style={{ WebkitTextStroke: "2px transparent" }}
              >
                {item.number}
              </p>
              <p className="text-md mt-5 z-20 font-medium relative">
                {item.title}
              </p>
              <p className="text-sm z-20 relative text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
