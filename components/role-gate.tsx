"use client";

import { Role, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { FC } from "react";
import ErrorText from "./error-text";

interface RoleGateProps {
  children: React.ReactNode;
}

const RoleGate: FC<RoleGateProps> = ({ children }) => {
  const { data } = useSession();
  const role = data?.user?.role;

  if (role !== Role.ADMIN) {
    return <ErrorText message="You are not authenticated to access this!" />;
  }

  return <>{children}</>;
};

export default RoleGate;
