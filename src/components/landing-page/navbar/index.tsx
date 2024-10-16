import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react"; // Importing the Lucide React Menu icon
import { Button } from "@/components/ui/button";

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

  // Scroll listener to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 1); // Change the value to match the height of your hero section
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
          ? "fixed top-0 left-0 w-full  shadow-lg z-50  bg-white " // Navbar after scrolling
          : "absolute top-4 w-full  bg-transparent z-50"
      } transition-all duration-300 ease-in-out p-4 h-fit  md:px-4 md:py-2 `}
    >
      <div className="flex justify-between items-center">
        {/* Logo or Brand Name */}
        {/* <div className="text-lg font-bold text-white md:text-black">
          <img
            src="./drowsy-guard-logo.png"
            alt=""
            className={`${scrolled ? "h-10 " : "h-10 lg:h-full"}`}
          />
        </div> */}

        {/* Menu Icon for smaller screens */}
        <div className="md:hidden menu-icon">
          <Menu
            className={` cursor-pointer`}
            size={28}
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle mobile menu
          />
        </div>

        {/* Desktop Menu */}
        <ul className={`hidden md:flex space-x-8 items-center `}>
          {menuData.map((item, index) => (
            <li key={index}>
              <a
                href={item.url}
                className="font-semibold text-lg hover:text-gray-500"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <Button className="bg-[#2196F3]">Start Recycling </Button>
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
              <a
                href={item.url}
                className="font-semibold text-lg hover:text-gray-500"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
