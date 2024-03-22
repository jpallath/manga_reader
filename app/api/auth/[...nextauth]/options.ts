import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { registerUser } from "@/db/user";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user?.email) {
        const userData = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        if (userData) {
          // @ts-ignore
          session.user.id = userData.id;
          // @ts-ignore
          session.user.username = userData.username;
          session.user.email = userData.email;
        }
      }
      return session;
    },
    async signIn({ profile }) {
      const user = await prisma.user.findUnique({
        where: { email: profile?.email },
      });
      let dbUser = user;
      if (!user && profile) {
        dbUser = await registerUser(profile);
      }
      return true;
    },
  },
};
