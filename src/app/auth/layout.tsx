import { Outlet, useLocation } from "react-router-dom"; // Example for another background image
import { useEffect } from "react";
import { Green_Bounty_Routes } from "@/store/route";

import signInBg from "../../assets/auth/sign-in.svg"
import signUpBg from "../../assets/auth/signup-svg.svg"
import emailVerification from "../../assets/auth/emailverification-svg.svg"
import forgotPassword from "../../assets/auth/forgotpassword.svg"
import congratulations from "../../assets/auth/congratulations-svg.svg"
import resetPassword from "../../assets/auth/resetpassword.svg"
import otpVerification from "../../assets/auth/otpverification.svg"
import GreenBountyLogo from "../../assets/logo/green-bounty-with-word.svg"

// Define the type for the background images mapping
type BackgroundImages = {
  [key: string]: string;
};

export const SignupAuthLayout: React.FC = () => {
  const { pathname } = useLocation();

  // Map routes to specific background images
  const backgroundImages: BackgroundImages = {
    [Green_Bounty_Routes.signIn]: signInBg,
    [Green_Bounty_Routes.forgotPassword]: forgotPassword,
    [Green_Bounty_Routes.signUp]: signUpBg, // Add additional routes and images as needed
    [Green_Bounty_Routes.resetPassword()]: resetPassword, // Add additional routes and images as needed
    [Green_Bounty_Routes.verifyOtp()]: otpVerification, // Add additional routes and images as needed
    [Green_Bounty_Routes.confirmResetEmailOtp()]: emailVerification, // Add additional routes and images as needed
    [Green_Bounty_Routes.congratulations]: congratulations, // Add additional routes and images as needed
  };

  // Select the background based on the current route
  const selectedBackground = backgroundImages[pathname] ;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex  w-full">
      {/* Left side background image container */}
      <div className="hidden lg:block w-1/2 min-h-screen">
        <img
          src={selectedBackground}
          alt="background-image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side content container */}
      <div className="flex-1 pt-6 border">
        <div className="h-full">
          <div className="flex flex-col max-w-[500px] mx-auto h-full pt-12 pb-2 justify-between items-center">
            <div className="flex flex-1 flex-col h-full w-full items-center">
              <div className="flex-1 w-full">
                <img src={GreenBountyLogo} className="w-28 h-28 ml-3 lg:hidden" alt="green-bounty-logo" />
                <Outlet />
              </div>
            </div>
            {/* Uncomment if needed */}
            <div className="flex items-center text-sm w-full justify-center gap-8 mt-24">
              <p>Terms</p>
              <p>Copyrights GreenBounty 2024</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


