import { Either, left, right } from "../logic/Either";

import { InvalidEmailError } from "./errors/invalid-email-error";

export class Email {
  private readonly email: string;

  private constructor(value: string) {
    this.email = value;
  }

  get value(): string {
    return this.email;
  }

  static isValid(email: string) {
    if (!email || email.trim().length > 255) return false;

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(email);
  }

  static format(email: string): string {
    return email.trim().toLowerCase();
  }

  static create(value: string): Either<InvalidEmailError, Email> {
    if (!this.isValid(value)) {
      return left(new InvalidEmailError());
    }

    const formattedEmail = this.format(value);

    return right(new Email(formattedEmail));
  }
}