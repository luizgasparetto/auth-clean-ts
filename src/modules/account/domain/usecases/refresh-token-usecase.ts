import { decode, sign } from "jsonwebtoken";

import { IDateService } from "../../../../core/shared/services/date/i-date-service";

import { DomainError } from "../../../../core/shared/errors/domain-error";
import { Either, left, right } from "../../../../core/shared/logic/Either";
import { RefreshTokenError } from "../errors/refresh-token-error";

import { IAccountTokenRepository } from "../repositories/i-account-token-repository";
import { auth } from "../../../../config/auth";
import { IAccountRepository } from "../repositories/i-account-repository";

interface IPayload {
  sub: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;

}

export class RefreshTokenUsecase {
  constructor(
    private dateService: IDateService,
    private accountRepository: IAccountRepository,
    private accountTokenRepository: IAccountTokenRepository
  ) { }

  async execute(token: string): Promise<Either<DomainError, RefreshTokenResponse>> {
    const { sub: account_id } = decode(token) as IPayload;

    const account = await this.accountRepository.findUser({ id: account_id });

    const accountToken = await this.accountTokenRepository.findByRefreshToken(token);

    if (!accountToken) {
      return left(new RefreshTokenError());
    }

    await this.accountTokenRepository.deleteById(accountToken.props.id as string);

    const refreshToken = sign({ email: account?.props.email.value }, process.env.SECRET_REFRESH_TOKEN as string, {
      subject: account_id,
      expiresIn: auth.expiresInRefreshToken
    });

    const refreshTokenExpiresDate = this.dateService.addDays(parseInt(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS as string));


    // Até aqui passou

    await this.accountTokenRepository.create({ accountId: account_id, refreshToken, expiresDate: refreshTokenExpiresDate });

    const newToken = sign({}, process.env.SECRET_ACCESS_TOKEN as string, {
      subject: account_id,
      expiresIn: auth.expiresInAccessToken
    });

    return right({ accessToken: newToken, refreshToken });
  }
}