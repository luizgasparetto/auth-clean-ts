import { ValueObjectError } from "../../errors/value-object-error";

export class InvalidEmailError extends ValueObjectError {
  constructor() {
    super("This email is invalid");
  }
}