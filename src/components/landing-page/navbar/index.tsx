import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Importing Menu and X icons from lucide-react
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import greenbountyLogo from "../../../assets/landing-page/greenbountylogo.png";
import { HashLink } from "react-router-hash-link";
import { Green_Bounty_Routes } from "@/store/route";


// Dummy menu data
const baseMenuData = [
  { title: "Home", url: "#home" },
  { title: "About", url: "#about-us" },
  { title: "Services", url: "#services" },
];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()


    const isHomePage = location.pathname === "/";

    // Conditionally modify menu data based on the current path
    const menuData = baseMenuData.map((item) => ({
      ...item,
      url: isHomePage ? item.url : `/${item.url}`,
    }));


  // Scroll listener to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants for Framer Motion
  const drawerVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  return (
    <>
      <nav
        className={`${
          scrolled
            ? "fixed top-0 left-0 w-full shadow-lg z-50 p-4 bg-white"
            : "absolute top-2 md:top-4 w-full bg-transparent z-50 p-4"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between screen-max-width mx-auto items-center">
          {/* Logo */}
          <div
            onClick={() => navigate(Green_Bounty_Routes.home)}
            className="text-lg flex cursor-pointer items-center font-bold text-black"
          >
            <img
              src={greenbountyLogo}
              alt="Green Bounty Logo"
              className={` ${scrolled ? "h-8" : "w-14 object-contain"}`}
            />
            <p>GreenBounty</p>
          </div>

          {/* Hamburger Menu Icon with transition to X */}
          <div className="md:hidden">
            <motion.button
              className="menu-icon cursor-pointer focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              initial={false}
              animate={{ rotate: isMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X size={28} className="text-gray-800" />
              ) : (
                <Menu size={28} className="text-gray-800" />
              )}
            </motion.button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex space-x-8 items-center">
              {menuData.map((item, index) => (
                <li key={index}>
                  {item.url.startsWith("#") ? (
                    <HashLink
                      smooth
                      to={item.url}
                      className={`font-semibold text-lg group hover:text-gray-500 relative ${
                        location.hash === item.url
                          ? "text-green-500"
                          : "text-black"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </HashLink>
                  ) : (
                    <Link
                      to={item.url}
                      className={`font-semibold text-lg group hover:text-gray-500 relative ${
                        location.pathname === item.url
                          ? "text-green-500"
                          : "text-black"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Button>Start Recycling</Button>
          </div>
        </div>
      </nav>

      {/* Drawer-style Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Blur Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 flex flex-col py-8 px-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
            >
              {/* Close Icon */}
              <motion.div className="flex justify-end">
                <X
                  size={28}
                  className="cursor-pointer text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                />
              </motion.div>

              <div className="mt-10 space-y-6">
                {menuData.map((item, index) => {
                  const LinkComponent = item.url.startsWith("#")
                    ? HashLink
                    : Link;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <LinkComponent
                        to={item.url}
                        className="relative block font-semibold text-lg text-gray-800 hover:text-white hover:bg-[#548235] px-4 py-2 rounded-lg transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-left bg-[#548235] transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                        <span className="relative">{item.title}</span>
                      </LinkComponent>
                    </motion.div>
                  );
                })}
              </div>

              {/* Call-to-Action Button */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  className="w-full px-6 py-3 rounded-lg text-white font-bold text-lg 
               bg-[#548235] hover:bg-green-700 shadow-lg transform hover:scale-105 
               transition-transform duration-300 ease-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Recycling
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
