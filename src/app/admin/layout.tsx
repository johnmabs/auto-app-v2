import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAdminMenuSections } from "@/config/admin-routes";
import { signOutAction } from "@/features/auth/actions/auth.actions";
import { AdminShell } from "@/shared/components/layout/admin-shell";
import z from "zod";
import { UserRole } from "@/shared/types";

export const metadata: Metadata = {
  title: {
    default: "Dashboard — Autostore Admin",
    template: "%s — Autostore Admin",
  },
  robots: { index: false, follow: false },
};

const roleSchema = z.enum(UserRole);

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const parsedRole = roleSchema.safeParse(session.user.role);

  const role = parsedRole.success ? parsedRole.data : UserRole.ADMIN;

  const adminMenuSections = getAdminMenuSections(role);

  return (
    <AdminShell
      user={session?.user}
      logoutAction={signOutAction}
      routes={adminMenuSections}
    >
      {children}
    </AdminShell>
  );
}
