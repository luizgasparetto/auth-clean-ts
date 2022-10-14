import { DomainError } from "src/core/shared/errors/domain-error";

import { Either, left, right } from "../../../../core/shared/logic/Either";
import { JWTAuthService } from "../../../../core/shared/services/auth/jwt-auth-service";
import { ICryptographyService } from "../../../../core/shared/services/cryptography/i-cryptography-service";
import { IDateService } from "../../../../core/shared/services/date/i-date-service";

import { InvalidEmailOrPasswordError } from "../errors/invalid-email-or-password-error";
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
    const user = await this.accountRepository.findUser({ email });

    if (!user) {
      return left(new InvalidEmailOrPasswordError());
    }

    const isPasswordValid = await this.cryptographyService.compare(password, user.props.password.value);

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const { token } = JWTAuthService.auth(user);
    const { refreshToken } = JWTAuthService.refreshToken(email, user.id);

    const refreshTokenExpiresDate = this.dateService.addDays(parseInt(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS as string));

    await this.accountTokenRepository.create({
      accountId: user.id,
      refreshToken: refreshToken,
      expiresDate: refreshTokenExpiresDate,
    })

    return right({ accessToken: token, refreshToken });
  }
}