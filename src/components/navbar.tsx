import { Bell, Menu, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useProviderContext } from "@/utils/constants";
import AvatarDropdown from "./shared/CustomAvatarDropdown";

const Navbar = () => {
  const { setIsSidebarOpen, user } = useProviderContext();

  return (
    <div className="border border-lightGray_two h-12 fixed left-0 right-0 z-20 bg-white flex items-center md:justify-between justify-end px-5">
      <div className="hidden md:flex items-center w-64 h-9 bg-[#f9fafb] border border-lightGray pl-1 rounded-lg overflow-hidden gap-1">
        <Search className="h-4" />
        <Input
          placeholder="Search.."
          className="h-full border-none ring-0 flex-1 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
        />
      </div>
      <div className="flex gap-3 items-center">
        <Bell className="h-5" />
        <AvatarDropdown user={user!} />
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu className="md:hidden h-5" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
