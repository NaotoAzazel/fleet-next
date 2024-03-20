import { adminIds } from "@/lib/constants";

import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login"
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_SECRET_ID as string,
      allowDangerousEmailAccountLinking: true,
      profile: async(profile) => {
        return {
          id: profile.id,
          name: profile.username,
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
};

export function verifyCurrentUserIsAdmin(userId: string): boolean {
  return adminIds.has(String(userId));
}