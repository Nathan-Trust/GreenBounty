import Lottie from "react-lottie";
import security from "../../../assets/lotties/security.json"

const termsDetails = [
  {
    title: "Introduction",
    content:
      "This Privacy Notice provides information on how Greenbounty works, collects and processes your personal data when you visit our website or mobile applications. It sets out what we do with your personal data and how we keep it secure and explains the rights that you have in relation to your personal data. ",
  },
  {
    title: "Information we collect",
    content:
      "We collect information that can be used to identify directly or indirectly a specific individual. We collect your personal data in order to provide tailored products and services and in order to analyse and continually improve our products and services.",
    subTitle: "The Information Includes:",

    ul: [
      {
        title: "Personal Information",
        content:
          "Such as name, email, address, and phone number (used for pickups and rewards).",
      },
      {
        title: "Usage Data",
        content:
          "Such as user activity on the site, IP addresses, device types, and browser types.",
      },
      {
        title: "Location Data",
        content:
          "Precise location data to optimize pickup services or suggest nearby recycling centers.",
      },
    ],
  },
  {
    title: "How we use Information",
    ul: [
      {
        title: "Provide Services",
        content:
          "The data is used to offer recycling pickups, redeem rewards, and manage user accounts.",
      },
      {
        title: "Improve User Experience",
        content:
          "Such as user activity on the site, IP addresses, device types, and browser types.",
      },
      {
        title: "Communication",
        content:
          " Precise location data to optimize pickup services or suggest nearby recycling centers.",
      },
    ],
  },
];
const Terms = () => {
     const defaultOptions = {
       loop: true,
       autoplay: true,
       animationData: security,
       rendererSettings: {
         preserveAspectRatio: "xMidYMid slice",
       },
     };
  return (
    <div className="pb-12">
      <div className="bg-primary/20 h-56 flex items-center justify-center relative overflow-hidden">
              <Lottie options={defaultOptions} height={200} width={200} />

      </div>
      <div className="screen-max-width py-2">
        <p className="text-center my-10 text-3xl font-medium">Privacy Policy </p>
        <ol className="list-decimal list-inside space-y-8 ">
          {termsDetails.map((data) => {
            const { title, content, ul } = data;
            return (
              <li key={title} className="font-medium">
                {/* Title and Content */}
                <span>{title}</span>
                <p className="text-sm text-[#000000CC] font-normal leading-relaxed">
                  {content}
                </p>

                {/* Nested List for Additional Items */}
                {ul && (
                  <ul className="list-disc pl-6 space-y-1 font-normal text-sm">
                    {ul.map((item) => (
                      <li key={item.title}>
                        <span className="font-medium"> {item.title}:</span>{" "}
                        {item.content}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Terms;
