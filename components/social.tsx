"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const signInUsingGoogle = async () => {
    await signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  const signInUsingGithub = async () => {
    await signIn("github", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="w-full flex flex-row gap-2">
      <div
        onClick={signInUsingGoogle}
        className="w-full border p-4 flex justify-center rounded-md cursor-pointer hover:bg-gray-50/90 transition-colors"
      >
        <FcGoogle />
      </div>
      <div
        onClick={signInUsingGithub}
        className="w-full border p-3 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-50/90 transition-colors"
      >
        <FaGithub />
      </div>
    </div>
  );
};

export default Social;
