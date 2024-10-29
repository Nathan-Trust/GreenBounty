import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { truncateText } from "../../utils/text";
import { User } from "@/services/user";
// import { getUserDetails } from "@/utils/constants";

const AvatarDropdown = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { initials, fullName } = getUserDetails(user);


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Avatar className="w-8 h-8 ">
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{initials}</AvatarFallback> */}
          </Avatar>
        </button>
      </PopoverTrigger>

      <PopoverContent sideOffset={5} align="end">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              {/* <AvatarFallback className="text-sm">{initials}</AvatarFallback> */}
            </Avatar>
            <div>
              {/* <p className="text-xs font-medium">{fullName}</p> */}
              <p className="text-xs text-grey ">
                {truncateText(user?.email ?? "", 20)}
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarDropdown;
