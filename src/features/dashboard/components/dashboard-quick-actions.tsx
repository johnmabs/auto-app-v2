import Link from "next/link";
import { ArrowRight, Car, Inbox, Users } from "lucide-react";

const QUICK_ACTIONS = [
  {
    href: "/admin/vehicles/new",
    label: "Ajouter un vehicule",
    icon: Car,
  },
  {
    href: "/admin/requests",
    label: "Gerer les demandes",
    icon: Inbox,
  },
  {
    href: "/admin/users",
    label: "Gerer les utilisateurs",
    icon: Users,
  },
] as const;

export function DashboardQuickActions() {
  return (
    <nav className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Actions rapides">
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-3 bg-(--bg-2) border border-(--border) rounded-(--r-lg) px-4 py-3.5 hover:border-(--border-2) hover:bg-(--bg-3) transition-all"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-(--r) bg-[rgba(201,168,76,0.1)] text-(--gold)">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-[0.8rem] font-medium leading-snug">
              {action.label}
            </span>
            <ArrowRight
              className="h-3.5 w-3.5 text-(--dim) ml-auto shrink-0"
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}
