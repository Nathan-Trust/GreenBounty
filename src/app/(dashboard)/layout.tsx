import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useProviderContext } from "@/utils/constants";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/side-bar";
import { getUser, useFetchMe } from "@/hooks/useCurrentUser";
import { Green_Bounty_Routes } from "@/store/route";
import SplashScreen from "@/components/splash-screen";

const Layout = () => {
  const { active, setUser } = useProviderContext();
  const location = useLocation();
  const outletRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useFetchMe();
  const navigate = useNavigate();
  const localUser = getUser();
  const isAuthenticated = Boolean(data || localUser);

  // Set user data once it's fetched
  useEffect(() => {
    if (data && data !== localUser) {
      setUser(data);
    } else if (localUser && localUser !== data) {
      setUser(localUser);
    }
  }, [data, localUser, setUser]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Onsite | Inactive";
      } else {
        document.title = `Onsite | ${active}`;
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
    //     const accessToken = localStorage.getItem("access_token");
    // && !accessToken
    if (!isLoading && !isAuthenticated) {
      navigate(Green_Bounty_Routes.signIn, { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (!data) return <SplashScreen />;

  return (
    <div className="h-screen overflow-hidden flex flex-col font-poppins">
      <Navbar />
      <div className="flex-1 h-screen  flex">
        <Sidebar />
        <div
          ref={outletRef}
          className=" flex flex-1 w-full pt-12 h-full overflow-y-auto bg-lightGray"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
