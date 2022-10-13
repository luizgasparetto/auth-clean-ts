import { DomainError } from "../../../../core/shared/errors/domain-error";

export class EmptyFieldsError extends DomainError {
  constructor() {
    super('Empty fields error', 409);
  }
}