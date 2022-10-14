import { DomainError } from "../../../../core/shared/errors/domain-error";

import { auth } from "../../../../config/auth";

import { Either, left, right } from "../../../../core/shared/logic/Either";
import { JWTAuthService } from "../../../../core/shared/services/auth/jwt-auth-service";
import { ICryptographyService } from "../../../../core/shared/services/cryptography/i-cryptography-service";
import { IDateService } from "../../../../core/shared/services/date/i-date-service";

import { InvalidEmailOrPasswordError } from "../errors/invalid-email-or-password-error";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { IAccountRepository } from "../repositories/i-account-repository";
import { IAccountTokenRepository } from "../repositories/i-account-token-repository";

type IRequest = {
  email: string;
  password: string;
}

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
}

export class AuthenticateAccountUsecase {
  constructor(
    private cryptographyService: ICryptographyService,
    private dateService: IDateService,
    private accountRepository: IAccountRepository,
    private accountTokenRepository: IAccountTokenRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<Either<DomainError, TokenResponse>> {
    const account = await this.accountRepository.findUser({ email });

    if (!account) {
      return left(new UserNotFoundError());
    }

    const isPasswordValid = await this.cryptographyService.compare(password, account.props.password.value);

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const { token } = JWTAuthService.auth(account);
    const { refreshToken } = JWTAuthService.refreshToken(email, account.id);

    const refreshTokenExpiresDate = this.dateService.addDays(auth.expiresInRefreshTokenDays);

    await this.accountTokenRepository.create({
      accountId: account.id,
      refreshToken: refreshToken,
      expiresDate: refreshTokenExpiresDate,
    })

    return right({ accessToken: token, refreshToken });
  }
}