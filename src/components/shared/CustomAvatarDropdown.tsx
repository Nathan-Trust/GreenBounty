import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { truncateText } from "../../utils/text";
import { User } from "@/services/user";
import { Constants } from "@/utils/constants";

const AvatarDropdown = ({ user }: { user: User | null }) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Avatar className="h-8 w-8 mr-1">
            <AvatarImage src={user?.profilePhoto ?? Constants.defaultAvatar} />
          </Avatar>
        </button>
      </PopoverTrigger>

      <PopoverContent sideOffset={5} align="end">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 mr-1">
              <AvatarImage
                src={user?.profilePhoto ?? Constants.defaultAvatar}
              />
            </Avatar>
            <div>
              <p className="text-xs font-medium">{truncateText(user?.name ?? "", 20)}</p>
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
