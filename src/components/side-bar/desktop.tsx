import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarItems, Theme } from "@/models/shared";
import { Constants, useProviderContext } from "@/utils/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AlignJustify, LogOut } from "lucide-react";
import { SidebarButton } from "./shared/button";
import GreenBountyLogo from "../../assets/logo/green-bounty-with-word.svg";
import { User } from "@/services/user";
import { truncateText } from "@/utils/text";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
  handleLogout: () => void;
  user: User | null;
  // initials: string;
  // fullName: string;
}

export function SidebarDesktop(props: Readonly<SidebarDesktopProps>) {
  const location = useLocation();
  const [value, setValue] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { setActive, setCurrentPage } = useProviderContext();
  const lastClickedRef = useRef<string | null>(null);

  useEffect(() => {
    setValue("");
  }, [location.pathname]);

  function isActivePath(currentPath: string, linkPath: string): boolean {
    if (currentPath === linkPath) {
      return true;
    }
    return (
      currentPath.startsWith(linkPath) && currentPath[linkPath.length] === "/"
    );
  }

  function toggleSidebar() {
    setIsExpanded(!isExpanded);
    setValue("");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleAccordionClick(link: any, index: number) {
    if (location.pathname !== link.href) {
      setIsExpanded(true);
      lastClickedRef.current = link.href;
      setCurrentPage(1);
      setValue("");
    } else if (lastClickedRef.current === link.href) {
      setValue(`item-${index}`);
    }
    lastClickedRef.current = link.href;
  }

  const handleAccordionChange = useCallback(
    (index: string) => {
      setCurrentPage(1);
      setValue(index);
    },
    [setCurrentPage]
  );

  return (
    <div
      className={`overflow-hidden bg-white border-r-2   border-[#00000080] h-full  ${
        isExpanded ? "fixed z-50 lg:relative" : ""
      }`}
    >
      <aside
        className={`transition-all duration-300 ${
          isExpanded ? "w-[240px]" : "w-[50px]"
        } lg:w-[240px] max-w-xs shadow-lg flex flex-col h-full overflow-y-auto`}
      >
        <button
          className={`w-full px-4 border-none outline-none flex lg:hidden items-center mt-3 ${
            isExpanded
              ? "justify-between "
              : "justify-center lg:justify-between"
          }`}
          onClick={toggleSidebar}
        >
          <AlignJustify
            size={20}
            className={`${isExpanded ? "" : "mt-3 lg:mt-0"}`}
          />
        </button>
        <img
          className="hidden lg:block w-24 h-24 ml-2.5"
          src={GreenBountyLogo}
        />

        <div className="flex flex-col flex-1 justify-between mt-4 pt-4 lg:mt-0 h-full">
          <div className="flex flex-col gap-5 w-full h-full ">
            {props.sidebarItems.theme.map((theme: Theme) => (
              <div key={theme.title} className="px-2 w-full">
                <div
                  className={`text-xs font-semibold ${
                    theme.title === ""
                      ? "hidden"
                      : theme.title !== "" && isExpanded
                      ? "block"
                      : ""
                  } h-[1.5px] mb-4 w-full bg-[#f1f4f6] `}
                />
                {theme.links.map((link, index) =>
                  link.children ? (
                    <Accordion
                      type="single"
                      className={`no-underline `}
                      collapsible
                      key={link.label}
                      value={value === `item-${index}` ? `item-${index}` : ""}
                      onValueChange={(value) => handleAccordionChange(value)}
                    >
                      <AccordionItem
                        className="no-underline mt-2 border-none"
                        value={`item-${index}`}
                      >
                        <AccordionTrigger
                          isExpanded={isExpanded}
                          className={`w-full items-center text-xs ${
                            isExpanded
                              ? "px-4 lg:px-0"
                              : "justify-center lg:justify-start px-0"
                          }  hover:bg-gray-200  h-10 rounded-md ${
                            isActivePath(location.pathname, link.href) &&
                            " lg:bg-primary lg:hover:bg-primary/95  "
                          } ${
                            isExpanded &&
                            isActivePath(location.pathname, link.href)
                              ? "text-white bg-primary hover:bg-primary/95 "
                              : isExpanded &&
                                isActivePath(location.pathname, link.href)
                              ? "bg-transparent hover:bg-transparent text-[#618be8]"
                              : isExpanded &&
                                !isActivePath(location.pathname, link.href)
                              ? ""
                              : !isExpanded &&
                                isActivePath(location.pathname, link.href)
                              ? "text-primary lg:text-white bg-transparent hover:bg-transparent"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccordionClick(link, index);
                          }}
                        >
                          <SidebarButton
                            icon={link.icon}
                            className={`hover:bg-transparent text-xs ${
                              isExpanded
                                ? ""
                                : "justify-center lg:justify-start"
                            } bg-transparent linkText ${
                              isActivePath(location.pathname, link.href) && ""
                            }`}
                          >
                            <span
                              className={`linkText ml-2 no-underline ${
                                isExpanded ? "block" : "hidden lg:block"
                              }`}
                            >
                              {link.label}
                            </span>
                          </SidebarButton>
                        </AccordionTrigger>
                        <AccordionContent className="flex gap-2 flex-col pb-0  pl-8 h-fit mb-0 mt-1 outline-none">
                          <div className="border-l flex flex-col gap-1 pt-1">
                            {link.children.map((child) => (
                              <Link key={child.href} to={child.href}>
                                <SidebarButton
                                  icon={child?.icon}
                                  onClick={() => setActive(child.label)}
                                  className={`w-full text-sm ${
                                    isExpanded
                                      ? "px-4"
                                      : "justify-center lg:justify-start lg:px-0"
                                  }   h-7 rounded-none ${
                                    isActivePath(
                                      location.pathname,
                                      child.href
                                    ) && " text-primary"
                                  }`}
                                >
                                  <span
                                    className={`linkText ml-2 ${
                                      isExpanded ? "block" : "hidden lg:block"
                                    }`}
                                  >
                                    {child.label}
                                  </span>
                                </SidebarButton>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="w-full"
                      onClick={() => setValue("")}
                    >
                      <SidebarButton
                        onClick={() => setActive(link.label)}
                        icon={link.icon}
                        className={`w-full ${
                          index > 0 ? "mt-2" : "mt-0"
                        } items-center text-sm ${
                          isExpanded
                            ? " px-4"
                            : "justify-center lg:justify-start"
                        }  hover:bg-deepBlue h-10 rounded-md ${
                          isActivePath(location.pathname, link.href) &&
                          " lg:bg-primary lg:hover:bg-primary/95  "
                        } ${
                          isExpanded &&
                          isActivePath(location.pathname, link.href)
                            ? "text-white bg-primary hover:bg-primary/95 "
                            : isExpanded &&
                              !isActivePath(location.pathname, link.href)
                            ? ""
                            : !isExpanded &&
                              isActivePath(location.pathname, link.href)
                            ? "text-primary lg:text-white bg-transparent hover:bg-transparent"
                            : ""
                        }`}
                      >
                        <span
                          className={`linkText ml-2 ${
                            isExpanded ? "block" : "hidden lg:block"
                          }`}
                        >
                          {link.label}
                        </span>
                      </SidebarButton>
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
          <div className="w-full h-10 self-end">
            <Popover>
              <PopoverTrigger className="h-10 w-full" asChild>
                <div
                  className={`flex ${
                    isExpanded
                      ? "justify-between"
                      : "justify-center lg:justify-between"
                  } cursor-pointer  items-center w-full px-2 icon-wrapper`}
                >
                  <div
                    className={`items-center logOutAvatar ${
                      isExpanded ? "flex" : "hidden lg:flex"
                    }`}
                  >
                    <Avatar className="h-8 w-8 mr-1">
                      <AvatarImage
                        src={
                          props?.user?.profilePhoto ?? Constants.defaultAvatar
                        }
                      />
                    </Avatar>
                    <div className=" ml-1">
                      <p className="text-xs">
                        {truncateText(props?.user?.name ?? "", 20)}
                      </p>
                      <p className="text-[10px]">
                        {truncateText(props?.user?.email ?? "", 20)}
                      </p>
                    </div>
                  </div>
                  <LogOut size={14} className="cursor-pointer shake" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                sideOffset={9}
                className="mb-2 w-56 p-1  rounded-lg border"
              >
                <div>
                  <SidebarButton
                    size="sm"
                    onClick={props.handleLogout}
                    icon={LogOut}
                    className="w-full gap-3 cursor-pointer"
                  >
                    Log Out
                  </SidebarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </aside>
    </div>
  );
}
