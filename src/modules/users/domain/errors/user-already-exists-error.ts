import { DomainError } from "src/core/shared/errors/DomainError";

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super('User already exists', 400);
  }
}