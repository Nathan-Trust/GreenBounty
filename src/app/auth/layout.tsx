import { Outlet, useLocation } from "react-router-dom";
import signUpBg from "../../assets/auth/greenBountySignUp.svg";
import forgotPasswordBg from "../../assets/auth/forgotPasswordBg.svg";
import { useEffect } from "react";

export const SignupAuthLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen flex items-center w-full">
      {/* Left side background image container */}
      <div className="hidden lg:block w-1/2 min-h-screen ">
        <img
          src={signUpBg}
          alt="greenBounty-svg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side content container */}
      <div className="flex-1 pt-6">
        <div className="h-full">
          <div className="flex flex-col max-w-[500px] min-h-[600px] mx-auto h-full pt-12 pb-2 justify-between items-center">
            <div className="flex flex-1 flex-col h-full w-full items-center">
              <div className="flex-1 w-full">
                <Outlet />
              </div>
            </div>
            {/* <div className="flex items-center text-sm w-full justify-center gap-8 mt-24">
              <p>Copyrights GreenBounty 2024</p>
              <p>Terms</p>
              <p>Privacy Policy</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen flex items-center w-full">
      {/* Left side background image container */}
      <div className="hidden lg:block w-1/2 min-h-screen ">
        <img
          src={forgotPasswordBg}
          alt="forgot-password-bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side content container */}
      <div className="flex-1 pt-6">
        <div className="h-full">
          <div className="flex flex-col max-w-[500px] min-h-[600px] mx-auto h-full pt-12 pb-2 justify-between items-center">
            <div className="flex flex-1 flex-col h-full w-full items-center">
              <div className="flex-1 w-full">
                <Outlet />
              </div>
            </div>
            {/* <div className="flex items-center text-sm w-full justify-center gap-8 mt-24">
              <p>Copyrights GreenBounty 2024</p>
              <p>Terms</p>
              <p>Privacy Policy</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
