"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserbyEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const newPassword = async (
  values: { password: string },
  token?: string
) => {
  if (!token) {
    return {
      error: "Missing token!",
    };
  }

  if (values?.password === "") {
    return {
      error: "Password field cannot be empty!",
    };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid token!",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUser = await getUserbyEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Password reset successfull!",
  };
};
