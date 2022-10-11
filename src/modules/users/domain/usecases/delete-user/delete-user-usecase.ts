import { DomainError } from "../../../../../core/shared/errors/domain-error";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/i-user-repository";

@injectable()
export class DeleteUserUsecase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findUser({ id });

    if (user === null || user === undefined) {
      throw new DomainError("User doesn't exists");
    }

    await this.userRepository.delete(id);
  }
}