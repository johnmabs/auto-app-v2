import { NextResponse } from "next/server";
import type { NextAuthConfig } from "next-auth";
import { UserRole } from "@/shared/types/roles";
import { z } from "zod";

const roleSchema = z.enum(UserRole);

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const pathname = nextUrl.pathname;
      const isLoggedIn = !!auth;
      const isOnAdminPage =
        pathname === "/admin" || pathname.startsWith("/admin/");

      const isOnLogin = pathname === "/login";

      if (isOnAdminPage) {
        if (!isLoggedIn) {
          return false;
        }

        /**
         * Validation runtime du role
         */
        const parsedRole = roleSchema.safeParse(auth.user.role);
        const role = parsedRole.success ? parsedRole.data : UserRole.ADMIN;

        return true;
      }

      if (isOnLogin && isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
