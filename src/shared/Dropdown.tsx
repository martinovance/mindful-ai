import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface DropTypes {
  title: string;
  email?: string;
  image?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const CustomDropdown = ({
  title,
  email,
  image,
  trigger,
  children,
}: DropTypes) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-full sm:w-72 rounded-lg shadow-lg p-4 bg-white"
      >
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image} />
            <AvatarFallback>{title[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-800">{title}</span>
            <span className="text-xs text-gray-500 truncate">{email}</span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-3" />

        <div className="flex flex-col gap-2">{children}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdown;
