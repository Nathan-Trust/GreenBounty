import React, { ReactNode, useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface CustomSheetProps {
  triggerComponent?: ReactNode | string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
  setActive?: (newState: boolean) => void;
}

const CustomSheet: React.FC<CustomSheetProps> = ({
  triggerComponent = "Open",
  title,
  description,
  children,
  className = "",
  active = false,
  setActive,
}) => {
  // If `setActive` is not passed, use local state
  const [localActive, setLocalActive] = useState(active);

  // Use the passed `setActive` if available, otherwise use the local state
  const handleOpenChange = (newState: boolean) => {
    if (setActive) {
      setActive(newState);
    } else {
      setLocalActive(newState);
    }
  };

  return (
    <Sheet
      open={setActive !== undefined ? active : localActive}
      onOpenChange={handleOpenChange}
    >
      <SheetTrigger asChild>
        {typeof triggerComponent === "string" ? (
          <button onClick={() => handleOpenChange(!active)}>
            {triggerComponent}
          </button>
        ) : (
          triggerComponent
        )}
      </SheetTrigger>
      <SheetContent
        className={` px-2 md:px-5 min-w-[350px]  bg-[#FCFCFC] ${className}`}
      >
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
