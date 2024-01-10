"use server";

import { auth } from "@/auth";
import { Role } from "@prisma/client";

export const adminSeverAction = async () => {
  const session = await auth();
  const role = session?.user?.role;

  if (role === Role.ADMIN) {
    return {
      success: "Allowed server action.",
    };
  }

  return {
    error: "Forbidden server action",
  };
};
