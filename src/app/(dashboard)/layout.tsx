import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useProviderContext } from "@/utils/constants";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/side-bar";
import { Green_Bounty_Routes } from "@/store/route";
import Cookies from "js-cookie";
import { decrypt } from "@/services/encryption";

const Layout = () => {
  const { active } = useProviderContext();
  const location = useLocation();
  const outletRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const user = token ? decrypt(token) : null;

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

  return (
    <div className="overflow-hidden flex h-screen font-poppins">
      <Sidebar />
      <div
        ref={outletRef}
        className="flex flex-col flex-1 w-full h-full bg-lightGray"
      >
        <Navbar />
        <div className="grid grid-cols-12 justify-between w-full h-full">
          <div
            className="h-full col-span-12 lg:col-span-9  bg-white overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 56px)" }}
          >
         <Outlet/>
          </div>
          <div className="h-full border-l-2 hidden lg:block border-[#00000080] bg-white col-span-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
