import LandingPageFooter from "@/components/landing-page/footer";
import Navbar from "@/components/landing-page/navbar";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div className=" min-h-screen ">
      <Navbar />
      <div className="w-full screen-max-width  h-fit ">
        <div className=" mt-28  z-20">
          <Outlet />
        </div>
      </div>
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageLayout;
