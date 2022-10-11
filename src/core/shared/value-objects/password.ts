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
    if (!password || password.length < 8) return false;

    const regex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");

    return regex.test(password);
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