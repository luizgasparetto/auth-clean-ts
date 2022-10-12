import { DomainError } from "../../../../core/shared/errors/domain-error";

export class InvalidUsernameError extends DomainError {
  constructor() {
    super('Invalid username', 400);
  }
}