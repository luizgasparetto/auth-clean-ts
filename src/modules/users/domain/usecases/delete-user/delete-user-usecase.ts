import { DomainError } from "src/core/shared/errors/DomainError";
import { inject, injectable } from "tsyringe";

import { DeleteUserDTO } from "../../dtos/delete-user-dto";
import { IUserRepository } from "../../repositories/i-user-repository";

@injectable()
export class DeleteUserUsecase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(data: DeleteUserDTO): Promise<void> {
    const { id } = data;

    const user = await this.userRepository.findUserById(id);

    if (user === null || user === undefined) {
      throw new DomainError("User doesn't exists");
    }

    await this.userRepository.delete({ id });
  }
}