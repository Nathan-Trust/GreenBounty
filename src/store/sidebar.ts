import {
  LayoutDashboard,
  Star,
  User,
} from "lucide-react";
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
          icon: LayoutDashboard ,
        }, {
          label: "Rewards",
          href: Green_Bounty_Routes.rewards,
          icon: Star ,	
        }, {
          label: "My Profile",
          href: "/profile",
          icon:User,
        }
      ],
    },

  ],
};
