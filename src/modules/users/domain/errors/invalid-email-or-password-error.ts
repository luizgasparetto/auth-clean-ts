import { DomainError } from "src/core/shared/errors/DomainError";

export class InvalidEmailOrPasswordError extends DomainError {
  constructor() {
    super('Invalid email or password', 400);
  }
}