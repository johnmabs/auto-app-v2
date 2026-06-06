import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Download, Search } from "lucide-react";
import { RequestStatus } from "@generated/prisma/enums";
import {
  getRequestStatusStatsAction,
  listCustomerRequestsAction,
} from "@/features/customer-requests/actions/customer-request.actions";
import { formatDate, formatPrice, cn } from "@/lib/utils";
import { TableSkeleton } from "@/shared/ui/skeleton";

export const metadata: Metadata = { title: "Demandes clients" };

const REQUESTS_PER_PAGE = 15;
const REQUESTS_BASE_PATH = "/admin/requests";

/* ── Status pill ─────────────────────────────────────────── */
function StatusPill({ status }: { status: RequestStatus }) {
  const map: Record<RequestStatus, { label: string; cls: string }> = {
    [RequestStatus.NEW]: {
      label: "Nouvelle",
      cls: "bg-[rgba(230,57,70,0.1)] text-(--accent) border-[rgba(230,57,70,0.3)]",
    },
    [RequestStatus.CONTACTED]: {
      label: "Contacté",
      cls: "bg-[rgba(201,168,76,0.1)] text-(--gold) border-[rgba(201,168,76,0.3)]",
    },
    [RequestStatus.IN_PROGRESS]: {
      label: "En cours",
      cls: "bg-[rgba(52,152,219,0.1)] text-(--blue) border-[rgba(52,152,219,0.3)]",
    },
    [RequestStatus.QUOTE_SENT]: {
      label: "Devis env.",
      cls: "bg-[rgba(201,168,76,0.1)] text-(--gold) border-[rgba(201,168,76,0.3)]",
    },
    [RequestStatus.CONFIRMED]: {
      label: "Confirmée",
      cls: "bg-[rgba(46,204,113,0.1)] text-(--green) border-[rgba(46,204,113,0.3)]",
    },
    [RequestStatus.DELIVERED]: {
      label: "Livrée",
      cls: "bg-[rgba(46,204,113,0.1)] text-(--green) border-[rgba(46,204,113,0.3)]",
    },
    [RequestStatus.CANCELLED]: {
      label: "Annulée",
      cls: "bg-[rgba(90,88,102,0.2)] text-(--muted) border-(--border)",
    },
  };
  const s = map[status] ?? map[RequestStatus.NEW];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold border",
        s.cls,
      )}
    >
      {s.label}
    </span>
  );
}

function buildRequestsHref({
  page,
  search,
  status,
}: {
  page?: number;
  search?: string;
  status?: string;
}) {
  const params = new URLSearchParams();
  if (page && page > 1) params.set("page", String(page));
  if (search) params.set("search", search);
  if (status && status !== "all") params.set("status", status);
  const query = params.toString();
  return query ? `${REQUESTS_BASE_PATH}?${query}` : REQUESTS_BASE_PATH;
}

async function listRequests({
  page,
  limit,
  search,
  status,
}: {
  page: number;
  limit: number;
  search?: string;
  status?: RequestStatus[];
}) {
  const response = await listCustomerRequestsAction(
    {
      search,
      status,
    },
    {
      page,
      limit,
    },
  );

  if (!response.success) {
    throw new Error(response.error);
  }

  return response.data;
}

/* ── KPI row ─────────────────────────────────────────────── */
async function DemandesKPIs() {
  const [all, statsResponse] = await Promise.all([
    listRequests({ page: 1, limit: 1 }),
    getRequestStatusStatsAction(),
  ]);
  const counts = Object.fromEntries(
    Object.values(RequestStatus).map((status) => [status, 0]),
  ) as Record<RequestStatus, number>;

  if (statsResponse.success) {
    for (const item of statsResponse.data) {
      counts[item.status] = item._count.status;
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Total", value: all.total, color: "text-[var(--text)]" },
        {
          label: "Nouvelles",
          value: counts[RequestStatus.NEW],
          color: "text-[var(--accent)]",
        },
        {
          label: "En cours",
          value: counts[RequestStatus.IN_PROGRESS],
          color: "text-[var(--blue)]",
        },
        {
          label: "Confirmées",
          value: counts[RequestStatus.CONFIRMED],
          color: "text-[var(--green)]",
        },
      ].map((k) => (
        <div
          key={k.label}
          className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) px-5 py-4"
        >
          <p className={cn("font-display text-[2rem] tracking-wide", k.color)}>
            {k.value}
          </p>
          <p className="text-[0.7rem] uppercase tracking-[0.08em] text-(--dim) mt-0.5">
            {k.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── Requests table (async) ──────────────────────────────── */
async function RequestsTable({
  status,
  search,
  page,
}: {
  status?: string;
  search?: string;
  page: number;
}) {
  const selectedStatus =
    status &&
    status !== "all" &&
    Object.values(RequestStatus).includes(status as RequestStatus)
      ? (status as RequestStatus)
      : undefined;
  const result = await listRequests({
    page,
    limit: REQUESTS_PER_PAGE,
    status: selectedStatus ? [selectedStatus] : undefined,
    search,
  });

  const { items, total, totalPages } = result;

  return (
    <>
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse"
          aria-label="Liste des demandes clients"
        >
          <thead>
            <tr className="bg-(--bg-3) border-b border-(--border)">
              {[
                "#",
                "Client",
                "Véhicule souhaité",
                "Budget",
                "Source",
                "Statut",
                "Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[0.66rem] font-medium uppercase tracking-widest text-(--dim) whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-16 text-center text-(--muted) text-sm"
                >
                  Aucune demande trouvée
                </td>
              </tr>
            ) : (
              items.map((req, i) => (
                <tr
                  key={req.id}
                  className="border-t border-(--border) hover:bg-(--bg-3) transition-colors group"
                >
                  <td className="px-4 py-3 font-mono text-[0.72rem] text-(--dim)">
                    #
                    {String(
                      total - (page - 1) * REQUESTS_PER_PAGE - i,
                    ).padStart(4, "0")}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[0.85rem]">
                      {req.firstName} {req.lastName}
                    </p>
                    <p className="font-mono text-[0.7rem] text-(--dim)">
                      {req.phone}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-[0.82rem] text-(--muted) max-w-50 truncate">
                    {req.desiredModel ??
                      (req.vehicle
                        ? `${req.vehicle.make} ${req.vehicle.model}`
                        : "Demande générale")}
                  </td>
                  <td className="px-4 py-3 font-mono text-[0.82rem]">
                    {req.budget ? formatPrice(req.budget) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[0.72rem] text-(--dim) capitalize">
                      {req.source ?? "form"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={req.status} />
                  </td>
                  <td className="px-4 py-3 text-[0.75rem] text-(--dim) whitespace-nowrap">
                    {formatDate(req.createdAt, "relative")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`${REQUESTS_BASE_PATH}/${req.id}`}
                        className="h-7 px-3 flex items-center rounded-(--r) border border-(--border) text-(--muted) text-[0.72rem] hover:text-(--gold) hover:border-(--gold) transition-all"
                      >
                        Traiter
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-(--border)">
          <p className="text-[0.78rem] text-(--muted)">
            {total} demande{total !== 1 ? "s" : ""} · Page {page}/{totalPages}
          </p>
          <div className="flex gap-1.5">
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
              const p = i + 1;
              return (
                <Link
                  key={p}
                  href={buildRequestsHref({ page: p, search, status })}
                  className={cn(
                    "h-8 w-8 flex items-center justify-center rounded-(--r) text-[0.78rem] border transition-all",
                    p === page
                      ? "bg-(--gold) text-(--bg) border-(--gold)"
                      : "border-(--border) text-(--muted) hover:border-(--border-2)",
                  )}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

/* ── Page ────────────────────────────────────────────────── */
const STATUS_FILTERS = [
  { value: "all", label: "Toutes" },
  { value: RequestStatus.NEW, label: "Nouvelles" },
  { value: RequestStatus.CONTACTED, label: "Contactées" },
  { value: RequestStatus.IN_PROGRESS, label: "En cours" },
  { value: RequestStatus.QUOTE_SENT, label: "Devis envoyé" },
  { value: RequestStatus.CONFIRMED, label: "Confirmées" },
  { value: RequestStatus.DELIVERED, label: "Livrées" },
  { value: RequestStatus.CANCELLED, label: "Annulées" },
];

export default async function DemandesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const active = params.status ?? "all";

  return (
    <main className="space-y-6 max-w-350">
      {/* Header */}
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-[2.2rem] tracking-[0.04em]">
            DEMANDES CLIENTS
          </h1>
          <p className="text-[0.82rem] text-(--muted) mt-1">
            Gestion et suivi des demandes
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 rounded-(--r) border border-(--border) text-(--muted) text-[0.78rem] hover:border-(--border-2) transition-all">
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Exporter CSV
        </button>
      </header>

      {/* KPIs */}
      <Suspense
        fallback={
          <div className="grid grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 skeleton rounded-(--r-lg)" />
            ))}
          </div>
        }
      >
        <DemandesKPIs />
      </Suspense>

      {/* Table */}
      <div className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) overflow-hidden">
        {/* Filters */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-(--border) flex-wrap">
          <form method="GET" className="relative flex-1 min-w-50 max-w-xs">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--dim) text-sm"
              aria-hidden="true"
            >
              <Search className="h-4 w-4" />
            </span>
            {active !== "all" && (
              <input type="hidden" name="status" value={active} />
            )}
            <input
              name="search"
              defaultValue={params.search}
              placeholder="Nom, email, téléphone..."
              className="w-full pl-9 pr-4 py-2 text-[0.82rem] bg-(--bg-3) border border-(--border) rounded-(--r) text-(--text) placeholder:text-(--dim) outline-none focus:border-(--gold) transition-colors"
            />
          </form>

          <div className="flex items-center gap-1.5 flex-wrap">
            {STATUS_FILTERS.map((f) => (
              <Link
                key={f.value}
                href={buildRequestsHref({
                  search: params.search,
                  status: f.value,
                })}
                className={cn(
                  "h-8 px-3 flex items-center text-[0.75rem] rounded-(--r) border transition-all",
                  active === f.value
                    ? "bg-[rgba(201,168,76,0.1)] border-[rgba(201,168,76,0.3)] text-(--gold)"
                    : "border-(--border) text-(--muted) hover:border-(--border-2) hover:text-(--text)",
                )}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>

        <Suspense
          key={JSON.stringify(params)}
          fallback={
            <table className="w-full">
              <TableSkeleton rows={10} cols={8} />
            </table>
          }
        >
          <RequestsTable
            status={params.status}
            search={params.search}
            page={page}
          />
        </Suspense>
      </div>
    </main>
  );
}
