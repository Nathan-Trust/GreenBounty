import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CustomDialogProps {
  triggerComponent?: ReactNode | string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  disabled?: boolean; // Add disabled prop here
}

const CustomDialog = ({
  triggerComponent = "Open",
  title,
  description,
  children,
  className = "",
  open,
  onOpenChange,
  disabled = false, // Default to false if not provided
}: CustomDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={cn("px-0", className)} disabled={disabled}>
        {typeof triggerComponent === "string" ? (
          <button disabled={disabled}>{triggerComponent}</button>
        ) : (
          triggerComponent
        )}
      </DialogTrigger>
      <DialogContent className="w-[350px] md:w-full">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
