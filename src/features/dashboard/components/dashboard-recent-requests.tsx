import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RequestStatus } from "@generated/prisma/enums";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import type { DashboardData, DashboardRecentRequest } from "../types/dashboard.types";

const REQUEST_STATUS_CONFIG: Record<RequestStatus, { label: string; className: string }> = {
  [RequestStatus.NEW]: {
    label: "Nouvelle",
    className: "bg-[rgba(230,57,70,0.1)] text-(--accent) border-[rgba(230,57,70,0.3)]",
  },
  [RequestStatus.CONTACTED]: {
    label: "Contacte",
    className: "bg-[rgba(201,168,76,0.1)] text-(--gold) border-[rgba(201,168,76,0.3)]",
  },
  [RequestStatus.IN_PROGRESS]: {
    label: "En cours",
    className: "bg-[rgba(52,152,219,0.1)] text-(--blue) border-[rgba(52,152,219,0.3)]",
  },
  [RequestStatus.QUOTE_SENT]: {
    label: "Devis envoye",
    className: "bg-[rgba(201,168,76,0.1)] text-(--gold) border-[rgba(201,168,76,0.3)]",
  },
  [RequestStatus.CONFIRMED]: {
    label: "Confirmee",
    className: "bg-[rgba(46,204,113,0.1)] text-(--green) border-[rgba(46,204,113,0.3)]",
  },
  [RequestStatus.DELIVERED]: {
    label: "Livree",
    className: "bg-[rgba(46,204,113,0.1)] text-(--green) border-[rgba(46,204,113,0.3)]",
  },
  [RequestStatus.CANCELLED]: {
    label: "Annulee",
    className: "bg-[rgba(90,88,102,0.2)] text-(--muted) border-(--border)",
  },
};

function RequestRow({ request }: { request: DashboardRecentRequest }) {
  const status = REQUEST_STATUS_CONFIG[request.status];

  return (
    <tr className="border-t border-(--border) hover:bg-(--bg-3) transition-colors">
      <td className="px-5 py-4">
        <p className="text-[0.85rem] font-medium">
          {request.firstName} {request.lastName}
        </p>
        <p className="text-[0.72rem] text-(--dim) font-mono mt-0.5">
          {request.phone}
        </p>
      </td>
      <td className="px-5 py-4 text-[0.82rem] text-(--muted)">
        {request.desiredModel ?? "Demande generale"}
      </td>
      <td className="px-5 py-4 text-[0.82rem] font-mono">
        {request.budget ? formatPrice(request.budget) : "-"}
      </td>
      <td className="px-5 py-4">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.68rem] font-semibold",
            status.className,
          )}
        >
          {status.label}
        </span>
      </td>
      <td className="px-5 py-4 text-[0.78rem] text-(--dim)">
        {formatDate(request.createdAt, "relative")}
      </td>
    </tr>
  );
}

export function DashboardRecentRequests({ data }: { data: DashboardData }) {
  return (
    <section className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-(--border)">
        <h2 className="font-medium text-[0.9rem]">Demandes recentes</h2>
        <Link
          href="/admin/requests"
          className="inline-flex items-center gap-1.5 text-[0.75rem] text-(--gold) hover:underline"
        >
          Voir tout <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      {data.recentRequests.length === 0 ? (
        <div className="py-12 text-center text-(--muted) text-sm">
          Aucune demande pour le moment
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" role="table">
            <thead>
              <tr className="bg-(--bg-3)">
                {["Client", "Vehicule souhaite", "Budget", "Statut", "Date"].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-left text-[0.68rem] font-medium uppercase tracking-widest text-(--dim)"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.recentRequests.map((request) => (
                <RequestRow key={request.id} request={request} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
