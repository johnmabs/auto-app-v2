import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Plus, Shield } from "lucide-react";
import { UserFilters } from "@/features/users/components/user-filters";
import { UserStats } from "@/features/users/components/user-stats";
import { UsersTable } from "@/features/users/components/users-table";
import { TableSkeleton } from "@/shared/ui/skeleton";

export const metadata: Metadata = { title: "Utilisateurs" };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function PageHeader() {
  return (
    <header className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="font-display text-[2.2rem] tracking-[0.04em]">
          UTILISATEURS
        </h1>
        <p className="text-[0.82rem] text-(--muted) mt-1">
          Gestion des comptes administrateurs
        </p>
      </div>
      <Link
        href="/admin/users/new"
        className="inline-flex items-center gap-2 h-9 px-5 rounded-(--r) bg-(--gold) text-(--bg) text-[0.8rem] font-semibold uppercase tracking-wider hover:bg-(--gold-2) transition-colors"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Ajouter
      </Link>
    </header>
  );
}

export default async function UsersPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(getParam(params, "page")) || 1;
  const filters = {
    page,
    search: getParam(params, "search"),
    role: getParam(params, "role"),
    isActive: getParam(params, "isActive"),
  };

  return (
    <main className="space-y-6 max-w-350">
      <PageHeader />

      <Suspense
        fallback={
          <div className="grid grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-20 skeleton rounded-(--r-lg)" />
            ))}
          </div>
        }
      >
        <UserStats />
      </Suspense>

      <div className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-(--border) bg-(--bg-3)">
          <Shield className="h-4 w-4 text-(--gold)" aria-hidden="true" />
          <p className="text-[0.75rem] text-(--muted)">
            Cette section est réservée aux super administrateurs.
          </p>
        </div>
        <UserFilters />

        <Suspense
          key={JSON.stringify(filters)}
          fallback={
            <table className="w-full">
              <TableSkeleton rows={10} cols={7} />
            </table>
          }
        >
          <UsersTable filters={filters} />
        </Suspense>
      </div>
    </main>
  );
}

