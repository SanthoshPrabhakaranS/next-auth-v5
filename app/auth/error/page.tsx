import ErrorCard from "@/components/error-card";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <ErrorCard />{" "}
    </div>
  );
};

export default ErrorPage;
