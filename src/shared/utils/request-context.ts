// src/features/shared/utils/request-context.ts
import { headers } from "next/headers";

/**
 * Extract IP address from incoming request headers.
 * Works behind common reverse proxies (Vercel, Nginx, Cloudflare).
 */
export async function getClientIp(): Promise<string | undefined> {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    headersList.get("cf-connecting-ip") ??
    undefined
  );
}

/**
 * Extract User-Agent from incoming request headers.
 */
export async function getUserAgent(): Promise<string | undefined> {
  const headersList = await headers();
  return headersList.get("user-agent") ?? undefined;
}

/**
 * Collect both IP and user-agent for audit logging.
 */
export async function getRequestMeta(): Promise<{
  ipAddress?: string;
  userAgent?: string;
}> {
  const [ipAddress, userAgent] = await Promise.all([getClientIp(), getUserAgent()]);
  return { ipAddress, userAgent };
}
