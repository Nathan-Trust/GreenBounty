"use client";
import * as React from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { PiSpinnerGap } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DropDownProps {
  options: { value: string; label: string; disabled?: boolean }[];
  label?: string;
  onSelect: (v: string) => void;
  className?: string;
  buttonIcon?: React.ReactElement;
  loading?: boolean;
}

export function DropDown({
  onSelect,
  options,
  label,
  className,
  buttonIcon,
  loading,
}: Readonly<DropDownProps>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex gap-0">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            className={cn("w-full justify-between bg-lightGray", className)}
            disabled={loading}
          >
            {buttonIcon}
            {value
              ? options.find((option) => option.value === value)?.label
              : `Select ${label ?? ""}...`}

            {open && !loading ? (
              <FaCaretUp
                className="ml-2 h-4 w-4 shrink-0 opacity-50 text-blue-500"
                size={20}
              />
            ) : null}

            {!open && !loading ? (
              <FaCaretDown
                className="ml-2 h-4 w-4 shrink-0 opacity-50 text-blue-500"
                size={20}
              />
            ) : null}
            {loading ? <PiSpinnerGap className="animate-spin" /> : null}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandEmpty>{`No ${label} found.`}</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelect(currentValue === value ? "" : currentValue);
                  }}
                  disabled={option?.disabled}
                >
                  <CheckCircledIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
