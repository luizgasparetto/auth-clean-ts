import { DomainError } from "src/core/shared/errors/domain-error";

export class RefreshTokenError extends DomainError {
  constructor() {
    super("Refresh token doesn't exists", 401);
  }
}