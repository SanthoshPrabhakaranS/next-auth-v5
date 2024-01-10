"use client";

import RegisterForm from "@/components/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
