"use server";

import { getUserbyEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/generate-token";
import { sendPasswordResetEmail } from "@/lib/mail";

export const resetPassword = async (values: { email: string }) => {
  if (values.email === "") {
    return {
      error: "Please enter your email address.",
    };
  }

  const existingUser = await getUserbyEmail(values.email);

  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(
    existingUser.email as string
  );

  await sendPasswordResetEmail(
    passwordResetToken.email as string,
    passwordResetToken.token as string
  );

  return {
    success: "Password reset email sent!",
  };
};
