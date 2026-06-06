import Link from "next/link";
import { Button } from "@/shared/ui/Button";

type Props = {
  page: number;
  total: number;
  limit: number;
  basePath?: string;
  search?: string;
  status?: string;
};

function buildHref({
  basePath,
  page,
  search,
  status,
}: Required<Pick<Props, "basePath" | "page">> &
  Pick<Props, "search" | "status">) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (search) params.set("search", search);
  if (status && status !== "all") params.set("status", status);
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function VehiclePagination({
  page,
  total,
  limit,
  basePath = "/admin/vehicles",
  search,
  status,
}: Props) {
  const pageCount = Math.max(1, Math.ceil(total / limit));

  return (
    <nav className="flex items-center justify-between px-5 py-4 border-t border-(--border)">
      <p className="text-[0.78rem] text-(--muted)">
        {total} véhicule{total !== 1 ? "s" : ""} · Page {page} sur {pageCount}
      </p>
      <div className="flex gap-1.5">
        <Link
          href={buildHref({
            basePath,
            page: Math.max(1, page - 1),
            search,
            status,
          })}
          aria-disabled={page <= 1}
        >
          <Button
            type="button"
            variant="subtle"
            size="sm"
            disabled={page <= 1}
            className="h-8 w-8 flex items-center justify-center rounded-(--r) text-[0.78rem] border transition-all bg-(--gold) text-(--bg) border-(--gold) hover:border-(--border-2)"
          >
            &lt;
          </Button>
        </Link>
        <Link
          href={buildHref({
            basePath,
            page: Math.min(pageCount, page + 1),
            search,
            status,
          })}
          aria-disabled={page >= pageCount}
        >
          <Button
            type="button"
            variant="subtle"
            size="sm"
            disabled={page >= pageCount}
            className="h-8 w-8 flex items-center justify-center rounded-(--r) text-[0.78rem] border transition-all bg-(--gold) text-(--bg) border-(--gold) hover:border-(--border-2)"
          >
            &gt;
          </Button>
        </Link>
      </div>
    </nav>
  );
}
