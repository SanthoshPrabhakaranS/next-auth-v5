import ResetPasswordForm from "@/components/reset-password-form";
import React from "react";

const newPasswordResetPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <ResetPasswordForm />
    </div>
  );
};

export default newPasswordResetPage;
