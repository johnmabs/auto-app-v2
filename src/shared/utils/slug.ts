// src/features/shared/utils/slug.ts
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function generateVehicleSlug(
  make: string,
  model: string,
  year: number,
  suffix?: string,
): string {
  const base = generateSlug(`${make} ${model} ${year}`);
  return suffix ? `${base}-${suffix}` : `${base}-${Date.now()}`;
}
