import { Either, left, right } from "../logic/Either";
import { InvalidUsernameError } from "./errors/invalid-username-error";

export class Username {
  private readonly username: string;

  private constructor(value: string) {
    this.username = value;
  }

  get value(): string {
    return this.username;
  }

  static isValid(username?: string) {
    if (!username || username.trim().length < 4 || username.trim.length > 16) return false;

    return true;
  }

  static format(username: string): string {
    return username.trim();
  }

  static create(value?: string): Either<InvalidUsernameError, Username> {
    if (!this.isValid(value)) {
      return left(new InvalidUsernameError());
    }

    const formattedUsername = this.format(value as string);

    return right(new Username(formattedUsername));
  }
}