import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  total: number;
  totalPages: number;
  search?: string;
  role?: string;
  isActive?: string;
};

function buildHref({
  page,
  search,
  role,
  isActive,
}: Omit<Props, "total" | "totalPages">) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (search) params.set("search", search);
  if (role && role !== "all") params.set("role", role);
  if (isActive && isActive !== "all") params.set("isActive", isActive);
  const query = params.toString();
  return query ? `/admin/users?${query}` : "/admin/users";
}

export function UserPagination({
  page,
  total,
  totalPages,
  search,
  role,
  isActive,
}: Props) {
  const pageCount = Math.max(1, totalPages);

  return (
    <nav className="flex items-center justify-between px-5 py-4 border-t border-(--border)">
      <p className="text-[0.78rem] text-(--muted)">
        {total} utilisateur{total !== 1 ? "s" : ""} · Page {page} sur{" "}
        {pageCount}
      </p>
      <div className="flex gap-1.5">
        {[
          {
            label: "Page précédente",
            page: Math.max(1, page - 1),
            disabled: page <= 1,
            icon: <ChevronLeft className="h-3.5 w-3.5" />,
          },
          {
            label: "Page suivante",
            page: Math.min(pageCount, page + 1),
            disabled: page >= pageCount,
            icon: <ChevronRight className="h-3.5 w-3.5" />,
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={buildHref({
              page: item.page,
              search,
              role,
              isActive,
            })}
            aria-disabled={item.disabled}
            className={cn(
              "h-8 w-8 flex items-center justify-center rounded-(--r) border transition-all",
              item.disabled
                ? "pointer-events-none opacity-40 border-(--border) text-(--muted)"
                : "bg-(--gold) text-(--bg) border-(--gold) hover:bg-(--gold-2)",
            )}
          >
            <span className="sr-only">{item.label}</span>
            {item.icon}
          </Link>
        ))}
      </div>
    </nav>
  );
}

