import {
  Cog,
  FileSpreadsheet,
  House,
  MessageCircleDashed,
  Users,
} from "lucide-react";
import { Green_Bounty_Routes } from "./route";
import { SidebarItems } from "@/models/shared";

export const sidebarItems: SidebarItems = {
  theme: [
    {
      title: "",
      links: [
        {
          label: "Overview",
          href: Green_Bounty_Routes.dashboard,
          icon: House,
        },
        {
          label: "Accounts",
          href: Green_Bounty_Routes.accounts,
          icon: Users,
          children: [
            {
              label: "Users",
              href: Green_Bounty_Routes.users,
            },
            {
              label: "Companies",
              href: Green_Bounty_Routes.companies,
            },
          ],
        },
        {
          label: "Projects",
          href: Green_Bounty_Routes.projects,
          icon: FileSpreadsheet,
        },
      ],
    },
    {
      title: "Messaging",
      links: [
        {
          label: "Messaging",
          href: Green_Bounty_Routes.messaging,
          icon: MessageCircleDashed,
        },
        {
          label: "Settings",
          href: Green_Bounty_Routes.settings,
          icon: Cog,
        },
      ],
    },
  ],
};
