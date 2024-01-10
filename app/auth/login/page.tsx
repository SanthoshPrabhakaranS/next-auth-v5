"use client";

import LoginForm from "@/components/login-form";
import React from "react";

const LoginPage = () => {

  return (
    <div className="w-full h-full flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
