"use client";

import { CheckCircle2 } from "lucide-react";
import React, { FC } from "react";

interface SuccessTextProps {
  message: string;
}

const SuccessText: FC<SuccessTextProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="p-2 flex items-center justify-center gap-1 text-center border bg-emerald-400/15 border-emerald-500 rounded-sm">
      <CheckCircle2 className="text-emerald-600" size={"20"} />
      <p className="text-emerald-600 text-sm">{message}</p>
    </div>
  );
};

export default SuccessText;
