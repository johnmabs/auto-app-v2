"use client";

import { useEffect, useState } from "react";
import type { AdminRouteSection } from "@/config/admin-routes";
import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";

interface AdminUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
  image?: string | null;
}

interface AdminShellProps {
  children: React.ReactNode;
  user: AdminUser;
  logoutAction: () => Promise<void>;
  routes: AdminRouteSection[];
}

export function AdminShell({
  children,
  user,
  logoutAction,
  routes,
}: AdminShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-screen bg-(--bg) flex">
      <AdminSidebar
        routes={routes}
        user={user}
        logoutAction={logoutAction}
        mobileOpen={drawerOpen}
        onMobileClose={() => setDrawerOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-(--sidebar-w)">
        <AdminTopbar
          user={user}
          mobileMenuOpen={drawerOpen}
          onMenuClick={() => setDrawerOpen(true)}
        />

        <main
          id="admin-main-content"
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
