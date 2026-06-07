import { hasMinRole, UserRole } from "@/shared/types/roles";
import type { AdminIconKey } from "@/shared/ui/admin-icons";

export type AdminRoute = {
  href: string;
  icon: AdminIconKey;
  label: string;
  badge?: number | string;
  badgeVariant?: "gold" | "danger" | "muted";
  description: string;
  minRole: UserRole;
  showInMenu?: boolean;

  /**
   * Si `true`, cette route matche aussi ses sous-chemins.
   */
  matchSubPaths?: boolean;
};

export type AdminRouteSection = {
  id: string;
  label: string;
  routes: AdminRoute[];
};

export const adminRouteSections: AdminRouteSection[] = [
  {
    id: "main",
    label: "Principale",
    routes: [
      {
        href: "/admin",
        label: "Tableau de bord",
        icon: "dashboard",
        description: "Vue d'ensemble de l'administration.",
        minRole: UserRole.ADMIN,
        matchSubPaths: false,
      },
    ],
  },

  {
    id: "catalog",
    label: "Catalogue",
    routes: [
      {
        href: "/admin/vehicles",
        label: "Vehicules",
        icon: "vehicles",
        description: "Gestion du catalogue automobile.",
        minRole: UserRole.ADMIN,
        matchSubPaths: true,
      },
    ],
  },

  {
    id: "customers",
    label: "Clients",
    routes: [
      {
        href: "/admin/requests",
        label: "Demandes clients",
        icon: "requests",
        description: "Suivi des demandes entrantes.",
        minRole: UserRole.ADMIN,
        matchSubPaths: true,
      },
    ],
  },

  /* {
    id: "content",
    label: "Contenu",
    routes: [
      {
        href: "/admin/testimonials",
        label: "Temoignages",
        icon: "testimonials",
        description: "Gestion des avis clients.",
        minRole: UserRole.ADMIN,
        matchSubPaths: true,
      },

      {
        href: "/admin/faq",
        label: "FAQ",
        icon: "faq",
        description: "Gestion des questions frequentes.",
        minRole: UserRole.SUPER_ADMIN,
        matchSubPaths: true,
      },

      {
        href: "/admin/site-content",
        label: "Contenu du site",
        icon: "content",
        description: "Edition des contenus CMS.",
        minRole: UserRole.ADMIN,
        matchSubPaths: true,
      },
    ],
  },
 */
  {
    id: "administration",
    label: "Administration",
    routes: [
      {
        href: "/admin/users",
        label: "Utilisateurs",
        icon: "users",
        description: "Gestion des comptes et des roles.",
        minRole: UserRole.SUPER_ADMIN,
        matchSubPaths: true,
      },

      /* {
        href: "/admin/partners",
        label: "Partenaires",
        icon: "partners",
        description: "Gestion des partenaires.",
        minRole: UserRole.ADMIN,
        matchSubPaths: true,
      },

      {
        href: "/admin/audit-logs",
        label: "Journal d'activite",
        icon: "logs",
        description: "Consultation des actions sensibles.",
        minRole: UserRole.SUPER_ADMIN,
        matchSubPaths: true,
      }, */
    ],
  },
];

/**
 * Toutes les routes aplaties.
 */
export const adminRoutes: AdminRoute[] = adminRouteSections.flatMap(
  (section) => section.routes,
);

export function getAdminMenuSections(userRole: UserRole): AdminRouteSection[] {
  return adminRouteSections
    .map((section) => {
      const accessibleRoutes = section.routes.filter((route) =>
        canAccessAdminRoute(userRole, route),
      );

      const menuRoutes = accessibleRoutes.filter(
        (route) => route.showInMenu !== false,
      );

      return {
        ...section,
        routes: menuRoutes,
      };
    })
    .filter((section) => section.routes.length > 0);
}

/**
 * Sections affichées dans le menu.
 */
export const adminMenuSections: AdminRouteSection[] = adminRouteSections
  .map((section) => ({
    ...section,
    routes: section.routes.filter((route) => route.showInMenu !== false),
  }))
  .filter((section) => section.routes.length > 0);

export function canAccessSection(
  userRole: UserRole,
  section: AdminRouteSection,
): boolean {
  /**
   * Une section est accessible
   * si l'utilisateur peut accéder
   * à au moins une route.
   */
  return section.routes.some((route) => canAccessAdminRoute(userRole, route));
}

export function canAccessAdminRoute(
  userRole: UserRole,
  route: AdminRoute,
): boolean {
  return hasMinRole(userRole, route.minRole);
}

export function getAccessibleRoutes(
  userRole: UserRole,
  routes: AdminRoute[],
): AdminRoute[] {
  return routes.filter((route) => canAccessAdminRoute(userRole, route));
}

function isDynamicRoute(href: string): boolean {
  return /\[(.+?)\]/.test(href);
}

function createRouteRegex(href: string): RegExp {
  const pattern = href
    .replace(/\[\[\.\.\.(.+?)\]\]/g, "(?:.+)?")
    .replace(/\[\.\.\.(.+?)\]/g, ".+")
    .replace(/\[(.+?)\]/g, "[^/]+")
    .replace(/\//g, "\\/");

  return new RegExp(`^${pattern}$`);
}

export function matchAdminRoute(pathname: string, route: AdminRoute): boolean {
  const { href, matchSubPaths } = route;

  /**
   * Route dynamique Next.js
   */
  if (isDynamicRoute(href)) {
    return createRouteRegex(href).test(pathname);
  }

  /**
   * Match exact
   */
  if (pathname === href) {
    return true;
  }

  /**
   * Sous-routes
   */
  if (matchSubPaths) {
    return pathname.startsWith(`${href}/`);
  }

  return false;
}

export function getAdminRouteForPath(pathname: string): AdminRoute | undefined {
  const sorted = [...adminRoutes].sort((a, b) => b.href.length - a.href.length);

  return sorted.find((route) => matchAdminRoute(pathname, route));
}
