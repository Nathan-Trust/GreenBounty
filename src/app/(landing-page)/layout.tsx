import LandingPageFooter from "@/components/landing-page/footer";
import Navbar from "@/components/landing-page/navbar";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div className=" min-h-screen font-Poppins ">
      <Navbar />
      <div className="w-full h-fit ">
        <div className=" mt-28  z-20">
          <Outlet />
        </div>
      </div>
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageLayout;
