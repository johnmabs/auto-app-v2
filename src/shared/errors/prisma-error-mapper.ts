// src/features/shared/errors/prisma-error-mapper.ts
import { Prisma } from "@generated/prisma/client";
import { ConflictError, DomainError, NotFoundError } from "./domain-errors";

export function mapPrismaError(error: unknown): DomainError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const fields = (error.meta?.target as string[])?.join(", ") ?? "field";
        return new ConflictError(`Duplicate value for unique field: ${fields}`);
      }
      case "P2025":
        return new NotFoundError("Record");
      case "P2003":
        return new DomainError(
          "Foreign key constraint failed",
          "FOREIGN_KEY_VIOLATION",
        );
      case "P2016":
        return new NotFoundError("Record");
      default:
        return new DomainError(
          `Database error: ${error.message}`,
          `PRISMA_${error.code}`,
        );
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new DomainError(
      "Invalid data provided to database",
      "DB_VALIDATION",
    );
  }

  if (error instanceof DomainError) return error;

  return new DomainError("An unexpected error occurred", "UNKNOWN");
}
