"use client";

import { AlertTriangle } from "lucide-react";
import React, { FC } from "react";

interface ErrorTextProps {
  message: string;
}

const ErrorText: FC<ErrorTextProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="p-2 flex items-center justify-center gap-1 text-center border bg-destructive/15 border-destructive rounded-sm">
      <AlertTriangle className="text-destructive" size={"20"} />
      <p className="text-destructive text-sm">{message}</p>
    </div>
  );
};

export default ErrorText;
