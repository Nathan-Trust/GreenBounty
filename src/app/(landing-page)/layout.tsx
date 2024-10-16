import LandingPageFooter from "@/components/landing-page/footer";
import Navbar from "@/components/landing-page/navbar";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div className=" min-h-screen border border-red-500 flex justify-between flex-col">
      <Navbar />
      <Outlet/>
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageLayout;
