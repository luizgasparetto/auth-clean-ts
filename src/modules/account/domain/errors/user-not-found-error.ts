import { DomainError } from "../../../../core/shared/errors/domain-error";

export class UserNotFoundError extends DomainError {
  constructor() {
    super("User doesn't exists", 404);
  }
}