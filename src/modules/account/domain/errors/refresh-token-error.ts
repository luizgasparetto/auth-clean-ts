import { DomainError } from "../../../../core/shared/errors/domain-error";

export class RefreshTokenError extends DomainError {
  constructor() {
    super("Refresh token doesn't exists", 401);
  }
}