import crypto from "crypto";

import { DomainError } from "../../../../core/shared/errors/domain-error";
import { Either, left, right } from "../../../../core/shared/logic/Either";

import { UserNotFoundError } from "../errors/user-not-found-error";

import { IAccountRepository } from "../repositories/i-account-repository";
import { IAccountTokenRepository } from "../repositories/i-account-token-repository";

export class SendForgotPasswordEmailUsecase {
  constructor(
    private accountRepository: IAccountRepository,
    private accountTokenRepository: IAccountTokenRepository
  ) { }

  async execute(id: string): Promise<Either<DomainError, null>> {
    const account = await this.accountRepository.findUser({ id });

    if (!account) {
      return left(new UserNotFoundError());
    }

    const token = crypto.randomUUID();

    await this.accountTokenRepository.create({ accountId: account.id, refreshToken: token })

    return right(null);
  }
}