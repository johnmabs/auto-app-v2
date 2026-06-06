"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { VEHICLE_STATUS_OPTIONS } from "../constants/vehicle-form.constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function VehicleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function applyFilters(formData: FormData) {
    const params = new URLSearchParams(searchParams);
    const search = String(formData.get("search") ?? "").trim();
    const status = String(formData.get("status") ?? "all");

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    params.delete("page");

    router.push(`/admin/vehicles?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-(--border) flex-wrap">
      <form action={applyFilters} className="relative flex-1 min-w-50 max-w-xs">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-(--dim) text-sm"
          aria-hidden="true"
        >
          {/* 🔍 */}
          <Search />
        </span>
        <input
          name="search"
          placeholder="Marque, modèle..."
          className="w-full pl-9 pr-4 py-2 text-[0.82rem] bg-(--bg-3) border border-(--border) rounded-(--r) text-(--text) placeholder:text-(--dim) outline-none focus:border-(--gold) transition-colors"
          defaultValue={searchParams.get("search") ?? ""}
        />
      </form>
      {/* Status filters */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {VEHICLE_STATUS_OPTIONS.map((option) => (
          <Link
            key={option}
            href={`/admin/vehicles?status=${option}`}
            className={cn(
              "h-8 px-3 flex items-center text-[0.75rem] rounded-(--r) border transition-all",
              (searchParams.get("status") ?? "all") === option
                ? "bg-[rgba(201,168,76,0.1)] border-[rgba(201,168,76,0.3)] text-(--gold)"
                : "border-(--border) text-(--muted) hover:border-(--border-2) hover:text-(--text)",
            )}
          >
            {option}
          </Link>
        ))}
      </div>
    </div>
  );
}
