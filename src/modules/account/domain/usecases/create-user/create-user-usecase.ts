import { Either, left, right } from "../../../../../core/shared/logic/either";
import { inject, injectable } from "tsyringe";

import { DomainError } from "../../../../../core/shared/errors/domain-error";
import { UserEntity } from "../../entities/user-entity";
import { InvalidEmailOrPasswordError } from "../../errors/invalid-email-or-password-error";
import { UserAlreadyExistsError } from "../../errors/user-already-exists-error";
import { IUserRepository } from "../../repositories/i-user-repository";
import { Email } from "../../../../../core/shared/value-objects/email";

import { CreateUserDTO } from "../../dtos/create-user-dto";
import { Password } from "src/core/shared/value-objects/password";

@injectable()
class CreateUserUsecase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(data: CreateUserDTO): Promise<Either<DomainError, UserEntity>> {
    const { username, email, password } = data;

    const userAlreadyExists = await this.userRepository.findUser({ username, email });

    if (userAlreadyExists instanceof UserEntity) {
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

    const result = await this.userRepository.create(data);

    return right(result);
  }
}

export { CreateUserUsecase };