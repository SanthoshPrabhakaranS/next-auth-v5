"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const UserButton = () => {
  const { data } = useSession();

  const logout = async () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data?.user?.image as string} />
          <AvatarFallback className="bg-sky-500">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <p
          onClick={logout}
          className="flex flex-row gap-2 items-center text-sm cursor-pointer hover:bg-secondary w-full h-full p-2"
        >
            <LogOut size={"19"} />
          Logout
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
