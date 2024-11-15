import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useProviderContext } from "@/utils/constants";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/side-bar";
import { Green_Bounty_Routes } from "@/store/route";
import Cookies from "js-cookie";
import { decrypt } from "@/services/encryption";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/user";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/models/query";

const Layout = () => {
  const { active } = useProviderContext();
  const location = useLocation();
  const outletRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const user = token ? decrypt(token) : null;
  const { userData } = useStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "GreenBounty | Inactive";
      } else {
        document.title = `GreenBounty | ${active}`;
      }
    };
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [active]);

  useEffect(() => {
    if (outletRef.current) {
      outletRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  useEffect(() => {
    if (!user) {
      navigate(Green_Bounty_Routes.signIn, { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    const fetchData = async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.Get_Current_User],
      });
    };

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [queryClient]);

  return (
    <div className="overflow-hidden flex h-screen font-poppins">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full h-full bg-lightGray">
        <Navbar />
        <div className="grid grid-cols-12 justify-between w-full h-full">
          <div
            ref={outletRef}
            className="h-full col-span-12 lg:col-span-9  bg-white overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 56px)" }}
          >
            <Outlet />
          </div>
          <div className="h-full border-l-2 hidden lg:block p-3 border-[#00000080] bg-white col-span-3">
            {userData?.basket === "STANDARD" && (
              <div key={location.key} className="flex h-full items-end w-full">
                <div className="mt-6 w-full">
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="text-xl font-semibold"
                  >
                    Premium Plan
                  </motion.p>

                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.3, // Delay to make the text animate first
                    }}
                    className="bg-[#d6e1cf] rounded-sm p-3 text-xs mt-2 w-full"
                  >
                    <p>Recycle unlimited premium items. Want more features?</p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.5, // Delay button animation
                      }}
                    >
                      <Button
                        className="mt-4"
                        onClick={() =>
                          navigate(Green_Bounty_Routes.chooseBasket, {
                            state: { fromSignIn: true },
                          })
                        }
                      >
                        Upgrade to Premium Plan
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}
            {userData?.basket === "PREMIUM" && (
              <div
                key={location.key}
                className="flex h-full items-end justify-center"
              >
                <div className="mb-6">
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="font-semibold text-xl mt-4 text-center text-yellow-500"
                  >
                    Enjoy unlimited premium features, faster support, and much
                    more! 🎁
                  </motion.p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
