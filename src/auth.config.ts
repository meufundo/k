import { saltAndHashPassword } from "@/lib/utils";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma.config";
import { z } from "zod";

const credentialsSchema = z.object({
  phone: z.string().length(9),
  password: z.string().min(6).max(16),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",

      credentials: {
        phone: {},
        password: {},
      },

      authorize: async (credentials) => {
        const { success, data } = credentialsSchema.safeParse(credentials);
        if (!success) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where: { phone: data.phone },
          include: { account: true },
        });
        if (!user) {
          return null;
        }
        const hashedPassword = saltAndHashPassword(data.password);
        if (user.password !== hashedPassword) {
          return null;
        }
        return {
          id: user.id,
          phone: user.phone,
          role: user.role,
          balance: user.account?.balance.toNumber(),
          code: user.code,
        };
      },
    }),
  ],

  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token.user = params.user;
      }
      return params.token;
    },

    async session({ session, token }) {
      const user = await prisma.user.findFirst({
        /* @ts-expect-error xxxx */
        where: { phone: token.user.phone ?? session.user.phone },
        include: { account: true },
      });
      if (!user) {
        /* @ts-expect-error xxxx */
        session.user = token.user;
        return session;
      }
      session.user.role = user.role;
      session.user.phone = user.phone;
      session.user.code = user.code;
      session.user.balance = user.account?.balance.toNumber() ?? 0;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/signin",
  },
});
