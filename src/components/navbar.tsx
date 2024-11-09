import { Bell, Menu, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useProviderContext } from "@/utils/constants";
import AvatarDropdown from "./shared/CustomAvatarDropdown";
import { useStore } from "@/store/user";

const Navbar = () => {
  const {userData} = useStore()
  const { setIsSidebarOpen, active } = useProviderContext();

  return (
    <div className="border-b-2 border-[#00000080] h-14 w-full sticky top-0  z-20 bg-white flex items-center justify-between px-5">
      <p>{active}</p>
      <div className="flex gap-3 items-center">
        <div className="hidden md:flex items-center w-64 h-9 bg-[#f9fafb] border border-lightGray pl-1 rounded-lg overflow-hidden gap-1">
          <Search className="h-4" />
          <Input
            placeholder="Search.."
            className="h-full border-none ring-0 flex-1 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
          />
        </div>
        <Bell className="h-5" />
        <AvatarDropdown user={userData} />
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu className="sm:hidden h-5" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
