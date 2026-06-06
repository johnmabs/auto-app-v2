// src/features/shared/errors/domain-errors.ts

export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = "DomainError";
  }
}

export class NotFoundError extends DomainError {
  constructor(entity: string, id?: string) {
    super(id ? `${entity} with id "${id}" not found` : `${entity} not found`, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends DomainError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = "You must be authenticated to perform this action") {
    super(message, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly fieldErrors?: Record<string, string[]>,
  ) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class ConflictError extends DomainError {
  constructor(message: string) {
    super(message, "CONFLICT");
    this.name = "ConflictError";
  }
}

export class BusinessRuleError extends DomainError {
  constructor(message: string) {
    super(message, "BUSINESS_RULE_VIOLATION");
    this.name = "BusinessRuleError";
  }
}
