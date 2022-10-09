import { inject, injectable } from "tsyringe";

import { DomainError } from "../../../../core/shared/errors/DomainError";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(data: CreateUserDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      throw new DomainError("User already exists", 400);
    }

    return await this.userRepository.create(data);
  }
}

export { CreateUserUseCase };