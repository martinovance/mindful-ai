import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { CircleX } from "lucide-react";

interface DropTypes {
  title: string;
  email?: string;
  image?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CustomDropdown = ({
  title,
  email,
  image,
  trigger,
  children,
  open,
  onOpenChange,
}: DropTypes) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-full sm:w-72 rounded-lg shadow-lg p-4 bg-white"
      >
        {email && (
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={image} />
              <AvatarFallback>{title[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-gray-800">
                {title}
              </span>
              <span className="text-xs text-gray-500 truncate">{email}</span>
            </div>
          </div>
        )}

        {title === "Notifications" && (
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg text-gray-800">{title}</p>
            <CircleX
              onClick={() => onOpenChange && onOpenChange(false)}
              className="cursor-pointer"
            />
          </div>
        )}

        <DropdownMenuSeparator className="my-3" />

        <div className="w-full sm-[350px]  flex flex-col gap-2">{children}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdown;
