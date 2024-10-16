import { Sheet, SheetClose, SheetContent, SheetHeader } from "../ui/sheet";
import { Button } from "../ui/button";
import { LogOut, MoreHorizontal, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useCallback, useState } from "react";
import { useProviderContext } from "@/utils/constants";
import { SidebarMobileButton } from "./shared/button";
import { truncateText } from "@/utils/text";
import { SidebarItems, Theme } from "@/models/shared";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
  handleLogout: () => void;
  user: User | null;
  initials: string;
  fullName: string;
}

export function SidebarMobile(props: Readonly<SidebarMobileProps>) {
  const location = useLocation();
  const { isSidebarOpen, setIsSidebarOpen, setActive, setCurrentPage } =
    useProviderContext();
  const [value, setValue] = useState("");

  function isActivePath(currentPath: string, linkPath: string) {
    if (currentPath === linkPath) {
      return true;
    }
    return (
      currentPath.startsWith(linkPath) && currentPath[linkPath.length] === "/"
    );
  }

  const handleAccordionChange = useCallback(
    (index: string) => {
      setCurrentPage(1);
      setValue(index);
    },
    [setCurrentPage]
  );

  return (
    <Sheet open={isSidebarOpen} onOpenChange={() => setIsSidebarOpen(false)}>
      <SheetContent side="left" className="px-1 " hideClose>
        <SheetHeader className="flex flex-row justify-end items-center space-y-0">
          <SheetClose asChild>
            <Button
              className="h-7 w-7 p-0"
              variant="ghost"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="h-full pb-6  overflow-y-auto">
          <div className="mt-5 flex flex-col  h-[300px] w-full gap-1">
            {props?.sidebarItems?.theme?.map((theme: Theme) => (
              <div key={theme.title} className=" px-2">
                <div
                  className={`text-xs font-semibold ${
                    theme.title === "" && "hidden"
                  } h-[1.5px] mb-4 w-full bg-[#f1f4f6] `}
                />
                {theme.links.map((link, index) =>
                  link.children ? (
                    <Accordion
                      type="single"
                      className={`no-underline ${index > 0 && "mt-2"}`}
                      collapsible
                      key={link.label}
                      value={`item-${index}` === value ? `item-${index}` : " "}
                      onValueChange={(value) => handleAccordionChange(value)}
                    >
                      <AccordionItem
                        className="no-underline border-none"
                        value={`item-${index}`}
                      >
                        <AccordionTrigger
                          isExpanded={true}
                          className={`no-underline hover:no-underline transition-none pr-3 w-full hover:text-white hover:bg-primary/95 text-grey h-10 rounded-sm ${
                            isActivePath(location.pathname, link.href) &&
                            "bg-primary text-white"
                          } `}
                        >
                          <SidebarMobileButton
                            onClick={() => setValue("")}
                            icon={link.icon}
                            className={`hover:bg-transparent h-9 bg-transparent ${
                              isActivePath(location.pathname, link.href) && ""
                            } `}
                          >
                            <span className=" no-underline">{link.label}</span>
                          </SidebarMobileButton>
                        </AccordionTrigger>
                        <AccordionContent className="flex gap-2 flex-col pb-0  pl-8 h-fit mb-0 mt-1 outline-none">
                          <div className="border-l flex flex-col gap-1 pt-1">
                            {link.children.map((child) => (
                              <Link key={child.label} to={child.href}>
                                <SheetClose className="w-full">
                                  <SidebarMobileButton
                                    icon={child?.icon}
                                    onClick={() => {
                                      setActive(child.label);
                                      setValue(" ");
                                    }}
                                    className={`w-full h-8 ${
                                      isActivePath(
                                        location.pathname,
                                        child.href
                                      ) && "text-primary"
                                    }`}
                                  >
                                    <span className=""> {child.label}</span>
                                  </SidebarMobileButton>
                                </SheetClose>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link key={link.label} to={link.href}>
                      <SheetClose className="w-full">
                        <SidebarMobileButton
                          onClick={() => setActive(link.label)}
                          icon={link.icon}
                          className={`w-full ${
                            index > 0 && "mt-2"
                          }  hover:text-white hover:bg-primary/95 h-9   ${
                            isActivePath(location.pathname, link.href) &&
                            "bg-primary text-white"
                          }`}
                        >
                          <span className="">{link.label}</span>
                        </SidebarMobileButton>
                      </SheetClose>
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
          <div className="absolute w-full bottom-0 py-2 bg-white px-1 left-0">
            {/* <Separator className="absolute -top-3 left-0 w-full" /> */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full  hover:bg-slate-100 bg-transparent text-black justify-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <div className="flex  items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://github.com/max-programming.png" />
                          <AvatarFallback>{props.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">
                          {" "}
                          {truncateText(props.fullName, 20)}
                        </span>
                      </div>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="mb-2 p-2">
                <div className="flex flex-col space-y-2 mt-2">
                  <SidebarMobileButton
                    size="sm"
                    onClick={() => props.handleLogout()}
                    icon={LogOut}
                    className="w-full cursor-pointer"
                  >
                    Log Out
                  </SidebarMobileButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
