import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { getUserbyEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          const { email, password } = credentials;

          const user = await getUserbyEmail(email as string);

          if (!user || !user.password) return null;

          const passwordCheck = await bcrypt.compare(
            password as string,
            user.password
          );

          if (passwordCheck) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
