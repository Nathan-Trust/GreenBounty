import aboutImg from "../../../assets/landing-page/image 9.png";
import aboutImgTwo from "../../../assets/landing-page/image 10.png";

const About = () => {
  return (
    <div
      className=" w-full pt-8"
      style={{
        background:
          "linear-gradient(135deg, #4a4848 20%, #120f0f 70%, #120f0f)",
      }}
    >
      <div className="max-w-[1100px] text-white mx-auto">
        {/* First Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 py-12 relative flex justify-center mb-6 md:mb-0">
            <img
              src={aboutImg}
              alt="about description"
              className=":w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] shadow-lg shadow-[#D9D9D9] rounded-full relative z-10"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 text-white ">
            <p className="text-lg font-semibold mb-2">Did you know?</p>
            <p className="text-xs leading-loose mb-4 mt-3">
              Drowsy driving is one of the leading causes of road accidents
              worldwide. Whether you’re managing a commercial fleet or driving
              your family, fatigue behind the wheel can have devastating
              consequences.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col md:flex-row justify-between mt-12 lg:mt-0">
          <div className="w-full md:w-1/2 px-4 mb-6 ">
            <p className="text-lg font-semibold mb-2">Meet DrowsyGuard</p>
            <p className="text-xs leading-loose mb-4">
              Our state-of-the-art software uses artificial intelligence to
              monitor driver fatigue in real-time. It tracks physical indicators
              like eye movements, facial expressions, and more to detect early
              signs of drowsiness—and immediately alerts the driver to prevent
              accidents.
            </p>
            <ul className="list-disc list-inside mb-4 text-xs space-y-2">
              <li>Non-intrusive and easy to install</li>
              <li>Highly accurate, AI-driven detection</li>
              <li>Real-time alerts for immediate response</li>
              <li>Works for both personal and commercial vehicles</li>
            </ul>
          </div>
          <div className="flex justify-center self-end">
            <img
              src={aboutImgTwo}
              alt="about description"
              className=" h-[250px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
