import { DomainError } from "../../../../core/shared/errors/domain-error";

export class InvalidEmailOrPasswordError extends DomainError {
  constructor() {
    super('Invalid email or password', 400);
  }
}