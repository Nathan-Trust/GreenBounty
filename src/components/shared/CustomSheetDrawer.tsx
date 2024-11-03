import React, { ReactNode } from "react";
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
  active: boolean;
  setActive: (newState: boolean) => void;
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
  return (
    <Sheet open={active} onOpenChange={setActive}>
      <SheetTrigger asChild>
        {typeof triggerComponent === "string" ? (
          <button onClick={() => setActive(!active)}>{triggerComponent}</button>
        ) : (
          triggerComponent
        )}
      </SheetTrigger>
      <SheetContent
        className={`pt-[120px] px-2 md:px-5 min-w-[350px]  bg-[#FCFCFC] ${className}`}
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
