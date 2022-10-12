import { ValueObjectError } from "../../errors/value-object-error";

export class InvalidUsernameError extends ValueObjectError {
  constructor() {
    super("Invalid username");
  }
}