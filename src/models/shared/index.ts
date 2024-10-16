import { User } from "@/services/user";
import { LucideIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface LayoutProps {
  children?: ReactNode;
}

export interface ApiResponse {
  [key: string]: unknown;
}

export type MyContextProps = {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; 
};

export interface RouteConfig {
  path: string;
  element: JSX.Element;
}

export interface DefaultDialogProps {
  isOpen?: boolean;
  onClose: () => void;
}


export interface SidebarItems {
  theme: Theme[];
  extras?: ReactNode;
}

export interface Theme {
  title: string;
  links: SidebarItem[];
}

export interface SidebarItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  children?: SidebarItem[];
}
