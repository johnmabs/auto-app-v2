"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { UserRole } from "@generated/prisma/enums";
import { cn } from "@/lib/utils";

const ROLE_FILTERS = [
  { value: "all", label: "Tous les rôles" },
  { value: UserRole.ADMIN, label: "Admins" },
  { value: UserRole.SUPER_ADMIN, label: "Super admins" },
];

const STATUS_FILTERS = [
  { value: "all", label: "Tous" },
  { value: "true", label: "Actifs" },
  { value: "false", label: "Inactifs" },
];

function buildUsersHref({
  search,
  role,
  isActive,
}: {
  search?: string | null;
  role?: string | null;
  isActive?: string | null;
}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (role && role !== "all") params.set("role", role);
  if (isActive && isActive !== "all") params.set("isActive", isActive);
  const query = params.toString();
  return query ? `/admin/users?${query}` : "/admin/users";
}

export function UserFilters() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const activeRole = searchParams.get("role") ?? "all";
  const activeStatus = searchParams.get("isActive") ?? "all";

  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-(--border) flex-wrap">
      <form method="GET" className="relative flex-1 min-w-50 max-w-xs">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-(--dim)"
          aria-hidden="true"
        >
          <Search className="h-4 w-4" />
        </span>
        {activeRole !== "all" && (
          <input type="hidden" name="role" value={activeRole} />
        )}
        {activeStatus !== "all" && (
          <input type="hidden" name="isActive" value={activeStatus} />
        )}
        <input
          name="search"
          defaultValue={search ?? ""}
          placeholder="Nom ou email..."
          className="w-full pl-9 pr-4 py-2 text-[0.82rem] bg-(--bg-3) border border-(--border) rounded-(--r) text-(--text) placeholder:text-(--dim) outline-none focus:border-(--gold) transition-colors"
        />
      </form>

      <div className="flex items-center gap-1.5 flex-wrap">
        {ROLE_FILTERS.map((filter) => (
          <Link
            key={filter.value}
            href={buildUsersHref({
              search,
              role: filter.value,
              isActive: activeStatus,
            })}
            className={cn(
              "h-8 px-3 flex items-center text-[0.75rem] rounded-(--r) border transition-all",
              activeRole === filter.value
                ? "bg-[rgba(201,168,76,0.1)] border-[rgba(201,168,76,0.3)] text-(--gold)"
                : "border-(--border) text-(--muted) hover:border-(--border-2) hover:text-(--text)",
            )}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {STATUS_FILTERS.map((filter) => (
          <Link
            key={filter.value}
            href={buildUsersHref({
              search,
              role: activeRole,
              isActive: filter.value,
            })}
            className={cn(
              "h-8 px-3 flex items-center text-[0.75rem] rounded-(--r) border transition-all",
              activeStatus === filter.value
                ? "bg-[rgba(46,204,113,0.1)] border-[rgba(46,204,113,0.3)] text-(--green)"
                : "border-(--border) text-(--muted) hover:border-(--border-2) hover:text-(--text)",
            )}
          >
            {filter.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
