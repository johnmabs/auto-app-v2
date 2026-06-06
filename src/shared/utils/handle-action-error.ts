// src/features/shared/utils/handle-action-error.ts
import { ZodError } from "zod";
import {
  DomainError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../errors/domain-errors";
import { mapPrismaError } from "../errors/prisma-error-mapper";
import { actionError, type ActionError } from "../types/action-response";

export function handleActionError(error: unknown): ActionError {
  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of error.issues) {
      const path = issue.path.join(".");
      fieldErrors[path] = [...(fieldErrors[path] ?? []), issue.message];
    }
    return actionError("Validation failed", "VALIDATION_ERROR", fieldErrors);
  }

  if (error instanceof ValidationError) {
    return actionError(error.message, error.code, error.fieldErrors);
  }

  if (error instanceof UnauthorizedError) {
    return actionError(error.message, "UNAUTHORIZED");
  }

  if (error instanceof ForbiddenError) {
    return actionError(error.message, "FORBIDDEN");
  }

  if (error instanceof NotFoundError) {
    return actionError(error.message, "NOT_FOUND");
  }

  if (error instanceof DomainError) {
    return actionError(error.message, error.code);
  }

  const mapped = mapPrismaError(error);
  return actionError(mapped.message, mapped.code);
}
