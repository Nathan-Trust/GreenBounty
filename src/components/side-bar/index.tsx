import { sidebarItems } from "@/store/sidebar";
import { SidebarDesktop } from "./desktop";
import { SidebarMobile } from "./mobile";
import { useMediaQuery } from "usehooks-ts";
import { useStore } from "@/store/user";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Green_Bounty_Routes } from "@/store/route";

export function Sidebar() {
  const { userData } = useStore();
  const navigate = useNavigate()
  // const { initials, fullName } = getUserDetails(userDetails!);

  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("userData");
    navigate(Green_Bounty_Routes.signIn)
  };

  if (isDesktop) {
    return (
      <SidebarDesktop
        sidebarItems={sidebarItems}
        handleLogout={handleLogOut}
        user={userData}
        // initials={initials}
        // fullName={fullName}
      />
    );
  }

  return (
    <SidebarMobile
      sidebarItems={sidebarItems}
      handleLogout={handleLogOut}
      user={userData}
      // initials={initials}
      // fullName={fullName}
    />
  );
}
