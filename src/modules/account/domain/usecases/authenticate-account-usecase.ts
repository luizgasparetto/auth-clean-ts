import { DomainError } from "src/core/shared/errors/domain-error";

import { Either, left, right } from "../../../../core/shared/logic/Either";
import { JWTAuthService } from "../../../../core/shared/services/auth/jwt-auth-service";

import { InvalidEmailOrPasswordError } from "../errors/invalid-email-or-password-error";
import { IAccountRepository } from "../repositories/i-account-repository";
import { ICryptographyService } from "src/core/shared/services/cryptography/i-cryptography-service";

type IRequest = {
  email: string;
  password: string;
}

type TokenResponse = {
  token: string;
}

export class AuthenticateAccountUsecase {
  constructor(
    private userRepository: IAccountRepository,
    private cryptographyService: ICryptographyService
  ) { }

  async execute({ email, password }: IRequest): Promise<Either<DomainError, TokenResponse>> {
    const user = await this.userRepository.findUser({ email });

    if (!user) {
      return left(new InvalidEmailOrPasswordError());
    }

    const isPasswordValid = await this.cryptographyService.compare(password, user.props.password.value);

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const { token } = JWTAuthService.auth(user);

    return right({ token });
  }
}