import { inject, injectable } from "tsyringe";

import { DomainError } from "src/core/shared/errors/domain-error";
import { Either, left, right } from "src/core/shared/logic/Either";
import { JWTAuthService } from "src/core/shared/services/auth/jwt-auth-service";

import { InvalidEmailOrPasswordError } from "../../errors/invalid-email-or-password-error";
import { IUserRepository } from "../../repositories/i-user-repository";
import { BCryptCryptographyServiceImpl } from "src/core/shared/services/cryptography/bcrypt-cryptography-service-impl";

type IRequest = {
  email: string;
  password: string;
}

type TokenResponse = {
  token: string;
}

@injectable()
export class AuthenticateUsecase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<Either<DomainError, TokenResponse>> {
    const user = await this.userRepository.findUser({ email });

    if (!user) {
      return left(new InvalidEmailOrPasswordError());
    }

    const isPasswordValid = new BCryptCryptographyServiceImpl().compare(user.props.password.value, password);

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const { token } = JWTAuthService.auth(user);

    return right({ token: token });
  }
}