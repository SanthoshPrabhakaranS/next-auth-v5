"use server";

import { signIn } from "@/auth";
import { formSchema } from "@/components/login-form";
import { getUserbyEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/generate-token";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof formSchema>) => {
  if (!values.email || !values.password) {
    return {
      error: "Invalid fields!",
    };
  }

  const existingUser = await getUserbyEmail(values.email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success: "Confirmation email sent!",
    };
  }

  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  return {
    success: "Email sent!",
  };
};
