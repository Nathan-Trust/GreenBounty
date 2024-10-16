import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react"; // Importing the Lucide React Menu icon
import { Link, useLocation } from "react-router-dom"; // Importing Link and useLocation from react-router-dom
import { Button } from "@/components/ui/button";
import greenbountyLogo from "../../../assets/landing-page/greenbountylogo.png";

// Dummy menu data
const menuData = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Services", url: "/services" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const menuRef = useRef<HTMLUListElement | null>(null); // Specify type of the ref
  const location = useLocation(); // Use useLocation to get the current URL

  // Scroll listener to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100); // Change the value to match the height of your hero section
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Ensure the click event is outside the menu or the icon
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".menu-icon")
      ) {
        setIsMenuOpen(false); // Close menu if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`${
        scrolled
          ? "fixed top-0 left-0 w-full  shadow-lg z-50 p-4   bg-white " // Navbar after scrolling
          : "absolute md:top-4 w-full  bg-transparent z-50 p-4 md:p-4 md:py-2 lg:px-0 "
      } transition-all duration-300 ease-in-out  h-fit `}
    >
      <div className="flex justify-between screen-max-width mx-auto items-center">
        {/* Logo or Brand Name */}
        <div className="text-lg flex flex-col items-center font-bold text-black">
          <img
            src={greenbountyLogo}
            alt=""
            className={`${scrolled ? "h-8 " : "w-14 lg:h-auto object-contain"}`}
          />
          <p>GreenBounty</p>
        </div>

        {/* Menu Icon for smaller screens */}
        <div className="md:hidden menu-icon">
          <Menu
            className={` cursor-pointer`}
            size={28}
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle mobile menu
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6  ">
          <ul className={`flex space-x-8 items-center `}>
            {menuData.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.url}
                  className={`font-semibold text-lg group hover:text-gray-500 relative ${
                    location.pathname === item.url
                      ? "text-green-500"
                      : "text-black"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <Button className=" ">Start Recycling</Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul
          ref={menuRef} // Ref to the mobile menu for "click outside" detection
          className={`md:hidden flex flex-col items-center  bg-white shadow-md py-6 mt-2 rounded-md space-y-4 ${
            scrolled ? "text-black" : "text-black"
          } animate-fadeIn`}
        >
          {menuData.map((item, index) => (
            <li key={index}>
              <Link
                to={item.url}
                className="font-semibold text-lg hover:text-gray-500"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
