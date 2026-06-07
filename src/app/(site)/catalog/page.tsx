import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { getCatalogVehicles } from "@/features/catalog/data/catalog.queries";
import { FilterSidebar } from "@/features/catalog/components/filter-sidebar";
import {
  FUEL_TYPE_FILTER_OPTIONS,
  PRICE_MAX,
  TRANSMISSION_FILTER_OPTIONS,
  VEHICLE_STATUS_FILTER_OPTIONS,
  VEHICLE_TYPE_FILTER_OPTIONS,
} from "@/features/catalog/lib/vehicle-filters";
import VehicleCard from "@/features/vehicles/components/vehicle-card";
import { Button } from "@/shared/ui/Button";
import { FilterSidebarSkeleton } from "@/shared/ui/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import {
  getCountryOptionLabel,
  type Country,
} from "@/shared/constants/countries";
import { COMPANY_INFO } from "@/shared/constants/company";

export const metadata: Metadata = {
  title: `Catalogue véhicules importés — ${COMPANY_INFO.name}`,
  description: `Découvrez les véhicules disponibles ou en importation sur demande chez ${COMPANY_INFO.name}: SUV, berlines et pickups sélectionnés depuis ${COMPANY_INFO.stats.countries} pays, avec filtres par budget et disponibilité.`,
};

type CatalogueSearchParams = {
  page?: string;
  country?: string | string[];
  type?: string | string[];
  fuel?: string | string[];
  make?: string | string[];
  status?: string | string[];
  maxPrice?: string;
  minYear?: string;
  maxYear?: string;
  sort?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  featured?: string;
  transmission?: string | string[];
};

const CATALOG_LIMIT = 12;

const SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Plus récents" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "year-desc", label: "Année récente" },
  { value: "mileage-asc", label: "Kilométrage bas" },
] as const;

function toArray(value: string | string[] | undefined) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function toPositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function getSort(searchParams: CatalogueSearchParams) {
  const sort =
    searchParams.sort ??
    `${searchParams.sortBy ?? "createdAt"}-${searchParams.sortOrder ?? "desc"}`;
  const [sortBy = "createdAt", sortOrder = "desc"] = sort.split("-");

  return {
    value: sort,
    sortBy,
    sortOrder,
  };
}

function appendParam(
  params: URLSearchParams,
  key: string,
  value: string | string[] | undefined,
) {
  toArray(value).forEach((item) => params.append(key, item));
}

function buildCatalogHref(
  searchParams: CatalogueSearchParams,
  overrides: Record<string, string | number | null>,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === "sortBy" || key === "sortOrder") {
      return;
    }

    appendParam(params, key, value);
  });

  Object.entries(overrides).forEach(([key, value]) => {
    params.delete(key);

    if (value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  const query = params.toString();

  return query ? `/catalog?${query}` : "/catalog";
}

function buildRemoveFilterHref(
  searchParams: CatalogueSearchParams,
  keyToRemove: keyof CatalogueSearchParams,
  valueToRemove?: string,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === "page") {
      return;
    }

    const values = toArray(value);

    if (key !== keyToRemove) {
      values.forEach((item) => params.append(key, item));
      return;
    }

    if (valueToRemove) {
      values
        .filter((item) => item !== valueToRemove)
        .forEach((item) => params.append(key, item));
    }
  });

  const query = params.toString();

  return query ? `/catalog?${query}` : "/catalog";
}

function getOptionLabel(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function Breadcrumb({ total }: { total: number }) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className="flex items-center gap-2 text-[0.78rem] text-(--muted)"
    >
      <Link href="/" className="transition-colors hover:text-(--gold)">
        Accueil
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-(--text)">Catalogue</span>
      <span aria-hidden="true">·</span>
      <span className="font-mono text-(--dim)">
        {total} résultat{total !== 1 ? "s" : ""}
      </span>
    </nav>
  );
}

function SearchForm({ searchParams }: { searchParams: CatalogueSearchParams }) {
  return (
    <form action="/catalog" className="relative w-full max-w-sm">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--dim)"
        aria-hidden="true"
      />
      <input
        name="search"
        defaultValue={searchParams.search ?? ""}
        placeholder="Marque, modèle..."
        className="h-10 w-full rounded-(--r) border border-(--border) bg-(--bg-3) pl-9 pr-4 text-[0.82rem] text-(--text) outline-none transition-colors placeholder:text-(--dim) focus:border-(--gold)"
      />
      {toArray(searchParams.country).map((country) => (
        <input key={country} type="hidden" name="country" value={country} />
      ))}
      {toArray(searchParams.type).map((type) => (
        <input key={type} type="hidden" name="type" value={type} />
      ))}
      {toArray(searchParams.fuel).map((fuel) => (
        <input key={fuel} type="hidden" name="fuel" value={fuel} />
      ))}
      {toArray(searchParams.make).map((make) => (
        <input key={make} type="hidden" name="make" value={make} />
      ))}
      {toArray(searchParams.transmission).map((transmission) => (
        <input
          key={transmission}
          type="hidden"
          name="transmission"
          value={transmission}
        />
      ))}
      {toArray(searchParams.status).map((status) => (
        <input key={status} type="hidden" name="status" value={status} />
      ))}
      {searchParams.maxPrice && (
        <input type="hidden" name="maxPrice" value={searchParams.maxPrice} />
      )}
      {searchParams.featured && (
        <input type="hidden" name="featured" value={searchParams.featured} />
      )}
      {searchParams.sort && (
        <input type="hidden" name="sort" value={searchParams.sort} />
      )}
    </form>
  );
}

function SortLinks({ searchParams }: { searchParams: CatalogueSearchParams }) {
  const currentSort = getSort(searchParams).value;

  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Tri du catalogue">
      {SORT_OPTIONS.map((option) => (
        <Link
          key={option.value}
          href={buildCatalogHref(searchParams, {
            sort: option.value,
            page: null,
          })}
          className={cn(
            "inline-flex h-8 items-center rounded-(--r) border px-3 text-[0.72rem] font-medium transition-colors",
            currentSort === option.value
              ? "border-(--gold) bg-[rgba(201,168,76,0.1)] text-(--gold)"
              : "border-(--border) text-(--muted) hover:border-(--border-2) hover:text-(--text)",
          )}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}

function ActiveFilterPills({
  searchParams,
}: {
  searchParams: CatalogueSearchParams;
}) {
  const pills: Array<{
    key: keyof CatalogueSearchParams;
    label: string;
    value?: string;
  }> = [];

  toArray(searchParams.country).forEach((country) => {
    pills.push({
      key: "country",
      label: getCountryOptionLabel(country as Country),
      value: country,
    });
  });

  toArray(searchParams.type).forEach((type) => {
    pills.push({
      key: "type",
      label: getOptionLabel(VEHICLE_TYPE_FILTER_OPTIONS, type),
      value: type,
    });
  });

  toArray(searchParams.fuel).forEach((fuel) => {
    pills.push({
      key: "fuel",
      label: getOptionLabel(FUEL_TYPE_FILTER_OPTIONS, fuel),
      value: fuel,
    });
  });

  toArray(searchParams.make).forEach((make) => {
    pills.push({
      key: "make",
      label: make,
      value: make,
    });
  });

  toArray(searchParams.transmission).forEach((transmission) => {
    pills.push({
      key: "transmission",
      label: getOptionLabel(TRANSMISSION_FILTER_OPTIONS, transmission),
      value: transmission,
    });
  });

  toArray(searchParams.status).forEach((status) => {
    pills.push({
      key: "status",
      label: getOptionLabel(VEHICLE_STATUS_FILTER_OPTIONS, status),
      value: status,
    });
  });

  if (searchParams.maxPrice && Number(searchParams.maxPrice) < PRICE_MAX) {
    pills.push({
      key: "maxPrice",
      label: `Max ${formatPrice(Number(searchParams.maxPrice))}`,
    });
  }

  if (searchParams.featured === "true") {
    pills.push({
      key: "featured",
      label: "Sélection recommandée",
    });
  }

  if (!searchParams.search && pills.length === 0) {
    return null;
  }

  return (
    <div className="mb-5 flex flex-wrap gap-2" aria-label="Filtres actifs">
      {searchParams.search && (
        <Link
          href={buildRemoveFilterHref(searchParams, "search")}
          className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.1)] px-2.5 py-1 text-[0.72rem] font-medium text-(--gold) transition-colors hover:bg-[rgba(201,168,76,0.2)]"
          aria-label={`Supprimer la recherche : ${searchParams.search}`}
        >
          {searchParams.search}
          <X className="h-3 w-3" aria-hidden="true" />
        </Link>
      )}

      {pills.map((pill) => (
        <Link
          key={`${pill.key}-${pill.value ?? pill.label}`}
          href={buildRemoveFilterHref(searchParams, pill.key, pill.value)}
          className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.1)] px-2.5 py-1 text-[0.72rem] font-medium text-(--gold) transition-colors hover:bg-[rgba(201,168,76,0.2)]"
          aria-label={`Supprimer le filtre : ${pill.label}`}
        >
          {pill.label}
          <X className="h-3 w-3" aria-hidden="true" />
        </Link>
      ))}

      <Link
        href="/catalog"
        className="inline-flex items-center gap-1.5 rounded-full border border-(--border) px-2.5 py-1 text-[0.72rem] text-(--muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
      >
        Tout effacer
        <X className="h-3 w-3" aria-hidden="true" />
      </Link>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: CatalogueSearchParams;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages: Array<number | "..."> = [];

  if (totalPages <= 7) {
    for (let index = 1; index <= totalPages; index++) {
      pages.push(index);
    }
  } else {
    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    for (
      let index = Math.max(2, page - 1);
      index <= Math.min(totalPages - 1, page + 1);
      index++
    ) {
      pages.push(index);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-1.5"
      aria-label="Pagination du catalogue"
    >
      <Link
        href={buildCatalogHref(searchParams, { page: Math.max(1, page - 1) })}
        aria-disabled={page <= 1}
        className={cn(
          "inline-flex h-9 items-center rounded-(--r) border px-4 text-[0.8rem] transition-colors",
          page <= 1
            ? "pointer-events-none border-(--border) text-(--dim) opacity-50"
            : "border-(--border) text-(--muted) hover:border-(--border-2) hover:text-(--text)",
        )}
      >
        Précédent
      </Link>

      {pages.map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-(--dim)"
          >
            ...
          </span>
        ) : (
          <Link
            key={item}
            href={buildCatalogHref(searchParams, { page: item })}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-(--r) border text-[0.82rem] font-medium transition-colors",
              item === page
                ? "border-(--gold) bg-(--gold) text-(--bg)"
                : "border-(--border) text-(--muted) hover:border-(--border-2) hover:text-(--text)",
            )}
          >
            {item}
          </Link>
        ),
      )}

      <Link
        href={buildCatalogHref(searchParams, {
          page: Math.min(totalPages, page + 1),
        })}
        aria-disabled={page >= totalPages}
        className={cn(
          "inline-flex h-9 items-center rounded-(--r) border px-4 text-[0.8rem] transition-colors",
          page >= totalPages
            ? "pointer-events-none border-(--border) text-(--dim) opacity-50"
            : "border-(--border) text-(--muted) hover:border-(--border-2) hover:text-(--text)",
        )}
      >
        Suivant
      </Link>
    </nav>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="font-display text-2xl tracking-wide text-(--text)">
        Aucun véhicule trouvé
      </h2>
      <p className="mt-3 max-w-sm text-[0.88rem] leading-relaxed text-(--muted)">
        Aucun véhicule ne correspond aux critères actuels. Vous pouvez élargir
        les filtres ou faire une demande personnalisée.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/catalog">Réinitialiser</Link>
        </Button>
        <Button asChild variant="subtle">
          <Link href="/contact">Demande personnalisée</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<CatalogueSearchParams>;
}) {
  const params = await searchParams;
  const page = toPositiveInteger(params.page, 1);
  const { value: sortValue, sortBy, sortOrder } = getSort(params);

  const { vehicles, total, totalPages } = await getCatalogVehicles({
    page,
    limit: CATALOG_LIMIT,
    countries: toArray(params.country),
    types: toArray(params.type),
    fuels: toArray(params.fuel),
    transmissions: toArray(params.transmission),
    makes: toArray(params.make),
    status: toArray(params.status),
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    minYear: params.minYear ? Number(params.minYear) : undefined,
    maxYear: params.maxYear ? Number(params.maxYear) : undefined,
    search: params.search,
    sortBy,
    sortOrder,
    featuredOnly: params.featured === "true",
  });

  const normalizedParams: CatalogueSearchParams = {
    ...params,
    sort: sortValue,
  };

  return (
    <main className="pt-(--nav-h)">
      <header className="border-b border-(--border) bg-(--bg-2) px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb total={total} />

          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="section-tag mb-2">Catalogue complet</p>
              <h1 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] tracking-[0.04em] text-(--text)">
                Nos véhicules
              </h1>
            </div>

            <div className="flex items-center gap-2 text-[0.78rem] text-(--muted) lg:hidden">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filtres
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[16.25rem_1fr] lg:items-start">
          <aside className="hidden lg:block">
            <Suspense fallback={<FilterSidebarSkeleton />}>
              <FilterSidebar />
            </Suspense>
          </aside>

          <section className="min-w-0" aria-label="Résultats du catalogue">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[0.82rem] text-(--muted)">
                  <span className="font-medium text-(--text)">{total}</span>{" "}
                  véhicule{total !== 1 ? "s" : ""}
                  {page > 1 && ` · Page ${page} sur ${totalPages}`}
                </p>
              </div>

              <SearchForm searchParams={normalizedParams} />
            </div>

            <div className="mb-6 lg:hidden">
              <Suspense fallback={<FilterSidebarSkeleton />}>
                <FilterSidebar />
              </Suspense>
            </div>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <ActiveFilterPills searchParams={normalizedParams} />
              <SortLinks searchParams={normalizedParams} />
            </div>

            {vehicles.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  role="list"
                  aria-label="Liste des véhicules"
                >
                  {vehicles.map((vehicle, index) => (
                    <div key={vehicle.id} role="listitem">
                      <VehicleCard vehicle={vehicle} priority={index < 3} />
                    </div>
                  ))}
                </div>

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  searchParams={normalizedParams}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
