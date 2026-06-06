import db from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { signInSchema } from "@/features/auth/schemas/sign-in.schema";
import { verifyPassword } from "@/features/auth/services/password.service";
import { env } from "./config/env";

const FAKE_HASH = env.AUTH_FAKE_HASH;
if (!FAKE_HASH) {
  throw new Error("AUTH_FAKE_HASH is not defined in environment variables");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
            isActive: true,
            image: true,
          },
        });

        // Protection timing attack
        if (!user || !user.isActive) {
          await verifyPassword(password, FAKE_HASH);
          return null;
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) return null;

        // lastLoginAt non bloquant
        try {
          await db.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });
        } catch (error) {
          console.error("[auth] Failed to update lastLoginAt:", error);
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
});
