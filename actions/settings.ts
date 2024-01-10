"use server";

import { auth } from "@/auth";
import { getUserbyId } from "@/data/user";
import { db } from "@/lib/db";

export const settings = async (values: any) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return {
      error: "Unauthorized!",
    };
  }

  const dbUser = await getUserbyId(user?.id);

  if (!dbUser) {
    return {
      error: "User not found!",
    };
  }

  await db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      ...values,
    },
  });

  return {
    success: "Settings updated!",
  };
};
