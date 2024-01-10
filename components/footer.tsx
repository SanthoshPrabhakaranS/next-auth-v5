"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ text, path }: { text: string; path: string }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`${path}`)}
      className="w-full text-center font-medium text-sm cursor-pointer hover:underline"
    >
      {text}
    </div>
  );
};

export default Footer;
