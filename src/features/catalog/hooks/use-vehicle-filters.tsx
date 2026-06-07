"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type {
  VehicleFilters,
  ArrayFilterKey,
} from "../types/vehicle-filters.types";
import {
  clampMaxPrice,
  createEmptyVehicleFilters,
  getVehicleFilterCount,
  parseVehicleFilters,
  PRICE_MAX,
  VEHICLE_FILTER_PARAM_NAMES,
} from "../lib/vehicle-filters";

export function useVehicleFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const serializedSearchParams = searchParams.toString();

  const [filters, setFilters] = useState<VehicleFilters>(() =>
    parseVehicleFilters(searchParams),
  );

  const activeCount = useMemo(() => {
    return getVehicleFilterCount(filters);
  }, [filters]);

  const toggleArray = useCallback(
    (key: ArrayFilterKey, value: string, checked: boolean) => {
      setFilters((prev) => ({
        ...prev,
        [key]: checked
          ? prev[key].includes(value)
            ? prev[key]
            : [...prev[key], value]
          : prev[key].filter((item) => item !== value),
      }));
    },
    [],
  );

  const setMaxPrice = useCallback((value: number) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: clampMaxPrice(value),
    }));
  }, []);

  const apply = useCallback(() => {
    const params = new URLSearchParams(serializedSearchParams);

    VEHICLE_FILTER_PARAM_NAMES.forEach((key) => params.delete(key));

    filters.countries.forEach((v) => params.append("country", v));

    filters.types.forEach((v) => params.append("type", v));

    filters.fuels.forEach((v) => params.append("fuel", v));

    filters.transmissions.forEach((v) => params.append("transmission", v));

    filters.status.forEach((v) => params.append("status", v));

    if (filters.maxPrice < PRICE_MAX) {
      params.set("maxPrice", filters.maxPrice.toString());
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, [filters, pathname, router, serializedSearchParams]);

  const reset = useCallback(() => {
    setFilters(createEmptyVehicleFilters());

    const params = new URLSearchParams(serializedSearchParams);

    VEHICLE_FILTER_PARAM_NAMES.forEach((key) => params.delete(key));
    params.delete("page");

    const nextSearchParams = params.toString();

    router.replace(
      nextSearchParams ? `${pathname}?${nextSearchParams}` : pathname,
      {
        scroll: false,
      },
    );
  }, [pathname, router, serializedSearchParams]);

  return {
    filters,

    activeCount,

    toggleArray,

    setMaxPrice,

    apply,

    reset,
  };
}
