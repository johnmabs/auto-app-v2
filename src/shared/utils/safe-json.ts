// src/features/shared/utils/safe-json.ts

/**
 * Safely serialize a value to a plain JSON-compatible object
 * suitable for Prisma Json fields (AuditLog.oldValue / newValue).
 */
export function toJsonValue(value: unknown): Record<string, unknown> | null {
  if (value === null || value === undefined) return null;
  try {
    return JSON.parse(JSON.stringify(value)) as Record<string, unknown>;
  } catch {
    return { _raw: String(value) };
  }
}

/**
 * Compute a shallow diff between two objects, returning only changed keys.
 */
export function shallowDiff(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): { old: Record<string, unknown>; new: Record<string, unknown> } {
  const old: Record<string, unknown> = {};
  const newVals: Record<string, unknown> = {};

  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

  for (const key of allKeys) {
    if (before[key] !== after[key]) {
      old[key] = before[key];
      newVals[key] = after[key];
    }
  }

  return { old, new: newVals };
}
