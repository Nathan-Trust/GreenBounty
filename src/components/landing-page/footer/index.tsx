import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://facebook.com",
    icon: FaFacebook,
    hoverColor: "hover:text-blue-600",
  },
  {
    href: "https://instagram.com",
    icon: FaInstagram,
    hoverColor: "hover:text-pink-500",
  },
  {
    href: "https://twitter.com",
    icon: FaTwitter,
    hoverColor: "hover:text-blue-400",
  },
  {
    href: "https://linkedin.com",
    icon: FaLinkedin,
    hoverColor: "hover:text-blue-800",
  },
];

const LandingPageFooter = () => {
  return (
    <footer className="border-t py-3">
      <div className="screen-max-width mx-auto px-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <h2 className="text-3xl font-bold text-gray-800">GreenBounty</h2>

        <p className="text-sm text-gray-500">© 2024 All rights reserved</p>

        <div className="flex space-x-6">
          {socialLinks.map(({ href, icon: Icon, hoverColor }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${href.split(".")[1]}`} // Dynamically adds platform name
            >
              <Icon
                className={`text-gray-500 transition-colors duration-300 ${hoverColor}`}
                size={24} // Increased size for better visibility
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
