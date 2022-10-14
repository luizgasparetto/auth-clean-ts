import { Either, left, right } from "../../../../core/shared/logic/either";

import { DomainError } from "../../../../core/shared/errors/domain-error";
import { Email } from "../../../../core/shared/value-objects/email";
import { AccountEntity } from "../entities/account-entity";

import { InvalidEmailOrPasswordError } from "../errors/invalid-email-or-password-error";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

import { IAccountRepository } from "../repositories/i-account-repository";

import { CreateUserDTO } from "../dtos/create-user-dto";
import { Password } from "../../../../core/shared/value-objects/password";

export class CreateAccountUsecase {
  constructor(
    private accountRepository: IAccountRepository
  ) { }

  async execute(data: CreateUserDTO): Promise<Either<DomainError, AccountEntity>> {
    const { username, email, password } = data;

    const userAlreadyExists = await this.accountRepository.findUser({ username, email });

    if (userAlreadyExists instanceof AccountEntity) {
      return left(new UserAlreadyExistsError());
    }

    const isEmailValid = Email.isValid(email);

    if (!isEmailValid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const isPasswordValid = Password.isValid(password);

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const result = await this.accountRepository.create(data);

    return right(result);
  }
}