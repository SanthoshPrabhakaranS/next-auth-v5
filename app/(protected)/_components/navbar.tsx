"use client";

import { Button } from "@/components/ui/button";
import UserButton from "@/components/user-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className="bg-secondary p-4 rounded-xl w-full flex flex-row justify-between items-center max-w-[900px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          variant={pathName === "/server" ? "default" : "outline"}
          asChild
        >
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button
          variant={pathName === "/client" ? "default" : "outline"}
          asChild
        >
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button variant={pathName === "/admin" ? "default" : "outline"} asChild>
          <Link href={"/admin"}>Admin</Link>
        </Button>   
        <Button
          variant={pathName === "/settings" ? "default" : "outline"}
          asChild
        >
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
