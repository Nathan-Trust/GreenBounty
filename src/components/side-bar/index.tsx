import { sidebarItems } from "@/store/sidebar";
import { SidebarDesktop } from "./desktop";
import { SidebarMobile } from "./mobile";
import { useMediaQuery } from "usehooks-ts";
import {  useProviderContext } from "@/utils/constants";

export function Sidebar() {
  const { user: userDetails } = useProviderContext();
  // const { initials, fullName } = getUserDetails(userDetails!);

  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  const user = {
    id:  "",
    name: "",
    firstName:  "",
    lastName:  "",
    email: userDetails?.email ?? "",
    avatar: "https://example.com/avatar.jpg",
  };
  const handleLogOut = () => {
    // eslint-disable-next-line no-console
    console.log("handle logout isnt beans man");
  };

  if (isDesktop) {
    return (
      <SidebarDesktop
        sidebarItems={sidebarItems}
        handleLogout={handleLogOut}
        user={user}
        // initials={initials}
        // fullName={fullName}
      />
    );
  }

  return (
    <SidebarMobile
      sidebarItems={sidebarItems}
      handleLogout={handleLogOut}
      user={user}
      // initials={initials}
      // fullName={fullName}
    />
  );
}
