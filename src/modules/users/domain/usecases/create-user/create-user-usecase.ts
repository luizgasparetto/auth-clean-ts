import { Either, left, right } from "src/core/logic/either";
import { AppError } from "src/core/shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { DomainError } from "../../../../../core/shared/errors/DomainError";
import { CreateUserDTO } from "../../dtos/create-user-dto";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../../repositories/i-user-repository";

@injectable()
class CreateUserUsecase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(data: CreateUserDTO): Promise<Either<AppError, UserEntity>> {
    const { username, email } = data;

    const userAlreadyExists = await this.userRepository.findUser({ username, email });

    if (userAlreadyExists instanceof UserEntity) {
      return left(new DomainError("User already exists", 400));
    }

    const result = await this.userRepository.create(data);

    return result.isLeft() ? left(result.value) : right(result.value);
  }
}

export { CreateUserUsecase };