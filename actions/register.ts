"use server";

import { registerSchema } from "@/components/register-form";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserbyEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/generate-token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof registerSchema>) => {
  if (!values.email || !values.password || !values.name) {
    return {
      error: "Invalid fields!",
    };
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);

  const user = await getUserbyEmail(values.email);

  if (user) {
    return {
      error: "Email already in use!",
    };
  }

  await db.user.create({
    data: {
      email: values.email,
      name: values.name,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(values.email);

  await sendVerificationEmail(values.email, verificationToken.token);

  return {
    success: "Confirmation email sent!",
  };
};
