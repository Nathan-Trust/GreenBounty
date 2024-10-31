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
  }, [navigate,user]);

  return (
    <div className="h-screen overflow-hidden flex w-full  font-poppins">
      <Sidebar />
      <div
        ref={outletRef}
        className=" flex flex-col flex-1 w-full h-full overflow-y-auto bg-lightGray"
      >
        <Navbar />
        <div className="flex-1 flex justify-between">
          <Outlet />
          <div className="h-full border-l-2 hidden lg:block border-[#00000080] bg-white w-[30%]"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
