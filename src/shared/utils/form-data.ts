// src/features/shared/utils/form-data.ts
function normalizeFormValue(value: FormDataEntryValue): unknown {
  if (value instanceof File) return value;

  const trimmed = value.trim();
  if (trimmed === "") return undefined;
  if (trimmed === "true" || trimmed === "on") return true;
  if (trimmed === "false") return false;

  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }

  return value;
}

export function formDataToObject(formData: FormData): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  for (const [rawKey, value] of formData.entries()) {
    const isArrayKey = rawKey.endsWith("[]");
    const key = isArrayKey ? rawKey.slice(0, -2) : rawKey;
    const normalized = normalizeFormValue(value);
    if (normalized === undefined) continue;

    if (isArrayKey) {
      data[key] = [...(Array.isArray(data[key]) ? data[key] : []), normalized];
      continue;
    }

    if (data[key] !== undefined) {
      data[key] = [...(Array.isArray(data[key]) ? data[key] : [data[key]]), normalized];
      continue;
    }

    data[key] = normalized;
  }

  return data;
}
