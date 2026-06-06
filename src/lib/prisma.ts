import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@generated/prisma/client";
import { env } from "@/config/env";

const globalForPrisma = globalThis as unknown as {
  db?: PrismaClient;
};

function createPrismaClient() {
  const databaseUrl = env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaPg({
    connectionString: databaseUrl,
  });

  return new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

const db = globalForPrisma.db ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.db = db;
}

export default db;
