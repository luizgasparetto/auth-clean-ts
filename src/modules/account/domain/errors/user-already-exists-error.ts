import { DomainError } from "../../../../core/shared/errors/domain-error";

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super('User already exists', 400);
  }
}