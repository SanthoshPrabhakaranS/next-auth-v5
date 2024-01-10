import { db } from "@/lib/db";

export const getAccountbyUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        id: userId,
      },
    });

    return account;
  } catch (error) {
    return null;
  }
};
