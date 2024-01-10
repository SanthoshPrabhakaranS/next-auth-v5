import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserbyId } from "./data/user";
import { getAccountbyUserId } from "./data/account";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserbyId(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as "ADMIN" | "USER";
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserbyId(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountbyUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
