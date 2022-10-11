import { ValueObjectError } from "../../errors/value-object-error";

export class InvalidPasswordError extends ValueObjectError {
  constructor() {
    super("Invalid password");
  }
}