import { DomainError } from "../../../../core/shared/errors/domain-error";
import { Either, left, right } from "../../../../core/shared/logic/Either";

import { UserNotFoundError } from "../errors/user-not-found-error";
import { IAccountRepository } from "../repositories/i-account-repository";

export class DeleteAccountUsecase {
  constructor(
    private userRepository: IAccountRepository
  ) { }

  async execute(id: string): Promise<Either<DomainError, null>> {
    const user = await this.userRepository.findUser({ id });

    if (!user) {
      return left(new UserNotFoundError());
    }

    await this.userRepository.delete(id);

    return right(null);
  }
}