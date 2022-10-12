import { Either, left, right } from "../logic/Either";
import { InvalidPasswordError } from "./errors/invalid-password-error";

import { compare } from "bcryptjs";

export class Password {
  private readonly password: string;

  private constructor(value: string) {
    this.password = value;
  }

  get value(): string {
    return this.password;
  }

  static isValid(password: string) {
    if (!password || password.length < 8 || password.length > 255) return false;

    return true;
  }

  async comparePassword(password: string) {
    return await compare(this.password, password);
  }

  static create(value: string): Either<InvalidPasswordError, Password> {
    if (!this.isValid(value)) {
      return left(new InvalidPasswordError());
    }

    return right(new Password(value));
  }
}