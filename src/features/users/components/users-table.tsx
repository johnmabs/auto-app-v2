import Link from "next/link";
import { Edit } from "lucide-react";
import { UserRole } from "@generated/prisma/enums";
import { formatDate } from "@/lib/utils";
import { listUsersAction } from "../actions/user.actions";
import { UserRolePill, UserStatusPill } from "./user-badges";
import { UserPagination } from "./user-pagination";
import { UserStatusButton } from "./user-status-button";

const USERS_PER_PAGE = 15;

type Props = {
  filters: {
    page: number;
    search?: string;
    role?: string;
    isActive?: string;
  };
};

function parseRole(role?: string) {
  if (!role || role === "all") return undefined;
  return Object.values(UserRole).includes(role as UserRole)
    ? [role as UserRole]
    : undefined;
}

function parseIsActive(isActive?: string) {
  if (isActive === "true") return true;
  if (isActive === "false") return false;
  return undefined;
}

export async function UsersTable({ filters }: Props) {
  const response = await listUsersAction(
    {
      search: filters.search,
      role: parseRole(filters.role),
      isActive: parseIsActive(filters.isActive),
    },
    {
      page: filters.page,
      limit: USERS_PER_PAGE,
    },
  );

  if (!response.success) {
    throw new Error(response.error);
  }

  const result = response.data;

  return (
    <>
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse"
          aria-label="Liste des utilisateurs"
        >
          <thead>
            <tr className="bg-(--bg-3) border-b border-(--border)">
              {[
                "Utilisateur",
                "Email",
                "Rôle",
                "Statut",
                "Dernière connexion",
                "Créé le",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-[0.66rem] font-medium uppercase tracking-widest text-(--dim) whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.items.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-16 text-center text-(--muted) text-sm"
                >
                  Aucun utilisateur trouvé
                </td>
              </tr>
            ) : (
              result.items.map((user) => {
                const label = user.name ?? user.email;

                return (
                  <tr
                    key={user.id}
                    className="border-t border-(--border) hover:bg-(--bg-3) transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-(--bg-4) border border-(--border) flex items-center justify-center text-[0.75rem] font-semibold text-(--gold)">
                          {label.slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-[0.85rem]">
                            {user.name ?? "Sans nom"}
                          </p>
                          <p className="font-mono text-[0.68rem] text-(--dim)">
                            {user.id.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[0.82rem] text-(--muted)">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <UserRolePill role={user.role} />
                    </td>
                    <td className="px-4 py-3">
                      <UserStatusPill isActive={user.isActive} />
                    </td>
                    <td className="px-4 py-3 text-[0.75rem] text-(--dim) whitespace-nowrap">
                      {user.lastLoginAt
                        ? formatDate(user.lastLoginAt, "relative")
                        : "Jamais"}
                    </td>
                    <td className="px-4 py-3 text-[0.75rem] text-(--dim) whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/users/${user.id}/edit`}
                          className="h-7 w-7 flex items-center justify-center rounded-(--r) border border-(--border) text-(--muted) hover:text-(--gold) hover:border-(--gold) transition-all"
                          aria-label={`Modifier ${label}`}
                          title="Modifier"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Link>
                        <UserStatusButton
                          id={user.id}
                          label={label}
                          isActive={user.isActive}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <UserPagination
        page={filters.page}
        total={result.total}
        totalPages={result.totalPages}
        search={filters.search}
        role={filters.role}
        isActive={filters.isActive}
      />
    </>
  );
}
