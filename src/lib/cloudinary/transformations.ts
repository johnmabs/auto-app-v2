import getCloudinary from "./client";

export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number | "auto";
    format?: "webp" | "avif" | "auto";
  } = {},
): string {
  const { width, height, quality = "auto", format = "auto" } = options;

  return getCloudinary.url(publicId, {
    transformation: [
      { width, height, crop: "fill", gravity: "auto" },
      { quality, fetch_format: format },
    ],
    secure: true,
  });
}

/* ── Generate blur placeholder ───────────────────────────── */
export function getBlurPlaceholder(publicId: string): string {
  return getCloudinary.url(publicId, {
    transformation: [
      { width: 20, quality: 10, effect: "blur:1000" },
      { fetch_format: "auto" },
    ],
    secure: true,
  });
}
