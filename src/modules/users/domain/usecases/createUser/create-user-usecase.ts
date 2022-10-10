import { inject, injectable } from "tsyringe";

import { DomainError } from "../../../../../core/shared/errors/DomainError";
import { CreateUserDTO } from "../../dtos/create-user-dto";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../../repositories/i-user-repository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(data: CreateUserDTO): Promise<void> {
    const { username, email } = data;

    const user = await this.userRepository.findUserByUsernameOrEmail({ username, email });

    if (user instanceof UserEntity) {
      throw new DomainError("User already exists", 400);
    }

    return await this.userRepository.create(data);
  }
}

export { CreateUserUseCase };