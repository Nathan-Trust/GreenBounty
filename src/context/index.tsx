import { MyContextProps } from "@/models/shared";
import { User } from "@/services/user";
import { createContext, useState, ReactNode, useMemo } from "react";

const defaultContextValue: MyContextProps = {
  active: " ",
  setActive: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  user: null,
  setUser: () => {},
};

const MyContext = createContext<MyContextProps>(defaultContextValue);

const MyProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<string>("Dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const value = useMemo(
    () => ({
      active,
      setActive,
      isSidebarOpen,
      setIsSidebarOpen,
      currentPage,
      setCurrentPage,
      user,
      setUser,
    }),
    [active, isSidebarOpen, currentPage, user] // Include relevant dependencies
  );

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };

