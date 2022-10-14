// REMOVE JWT and use JWT Service
import { sign, verify } from "jsonwebtoken";
import { IDateService } from "../../../../core/shared/services/date/i-date-service";

import { DomainError } from "../../../../core/shared/errors/domain-error";
import { Either, left, right } from "../../../../core/shared/logic/Either";
import { RefreshTokenError } from "../errors/refresh-token-error";

import { IAccountTokenRepository } from "../repositories/i-account-token-repository";

interface IPayload {
  sub: string;
  email: string;
}

interface RefreshTokenResponse {
  refreshToken: string;
}

export class RefreshTokenUsecase {
  constructor(
    private dateService: IDateService,
    private accountTokenRepository: IAccountTokenRepository
  ) { }

  async execute(token: string): Promise<Either<DomainError, RefreshTokenResponse>> {
    const decode = verify(token, process.env.SECRET_REFRESH_TOKEN as string) as IPayload;

    const accountId = decode.sub;

    const accountToken = await this.accountTokenRepository.findByAccountIdRefreshToken(accountId, token);

    if (!accountToken) {
      return left(new RefreshTokenError());
    }

    await this.accountTokenRepository.deleteById(accountToken.id);

    const refreshToken = sign({ email: decode.email }, process.env.SECRET_REFRESH_TOKEN as string, {
      subject: decode.sub,
      expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN
    });

    const refreshTokenExpiresDate = this.dateService.addDays(parseInt(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS as string));

    await this.accountTokenRepository.create({ accountId, refreshToken, expiresDate: refreshTokenExpiresDate });

    return right({ refreshToken });
  }
}