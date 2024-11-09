import { Home, LayoutDashboard, Star, User } from "lucide-react";
import { Green_Bounty_Routes } from "./route";
import { SidebarItems } from "@/models/shared";

export const sidebarItems: SidebarItems = {
  theme: [
    {
      title: "",
      links: [
        {
          label: "Dashboard",
          href: Green_Bounty_Routes.dashboard,
          icon: LayoutDashboard,
        },
        {
          label: "Add Recycables",
          href: Green_Bounty_Routes.addRecycables,
          icon: Home,
        },
        {
          label: "Rewards",
          href: Green_Bounty_Routes.rewards,
          icon: Star,
        },
        {
          label: "My Profile",
          href: "/profile",
          icon: User,
        },
      ],
    },
  ],
};
