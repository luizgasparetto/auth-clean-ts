
import { DomainError } from "../../../../core/shared/errors/domain-error";
import { Either, left, right } from "../../../../core/shared/logic/Either";

import { ICryptographyService } from "../../../../core/shared/services/cryptography/i-cryptography-service";

import { RefreshTokenError } from "../errors/refresh-token-error";

import { IAccountRepository } from "../repositories/i-account-repository";
import { IAccountTokenRepository } from "../repositories/i-account-token-repository";

interface IRequest {
  token: string;
  password: string;
}

export class ResetAccountPasswordUsecase {
  constructor(
    private cryptographyService: ICryptographyService,
    private accountRepository: IAccountRepository,
    private accountTokenRepository: IAccountTokenRepository
  ) { }

  async execute({ token, password }: IRequest): Promise<Either<DomainError, null>> {
    const tokenExists = await this.accountTokenRepository.findByRefreshToken(token);

    if (!tokenExists) {
      return left(new RefreshTokenError());
    }

    const account = await this.accountRepository.findUser({ id: tokenExists.props.accountId });

    const newPassword = await this.cryptographyService.hash(password);

    // Erro pois o props.password é readonly/private

    // account.props.password = await this.cryptographyService.hash(password);

    await this.accountTokenRepository.deleteById(tokenExists.props.id as string);

    return right(null);
  }
}