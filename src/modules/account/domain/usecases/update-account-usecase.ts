import { DomainError } from "../../../../core/shared/errors/domain-error";
import { Either, left, right } from "../../../../core/shared/logic/Either";

import { Username } from "../../../../core/shared/value-objects/username";
import { Email } from "../../../../core/shared/value-objects/email";
import { Password } from "../../../../core/shared/value-objects/password";

import { UpdateUserDTO } from "../dtos/update-user-dto";

import { InvalidUsernameError } from "../errors/invalid-username-error";
import { IAccountRepository } from "../repositories/i-account-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { InvalidEmailOrPasswordError } from "../errors/invalid-email-or-password-error";
import { EmptyFieldsError } from "../errors/empty-fields-error";

// TODO -  Trocar o modo como é feito e mandar pelas querys??
export class UpdateAccountUsecase {
  constructor(
    private accountRepository: IAccountRepository
  ) { }

  async execute(data: UpdateUserDTO): Promise<Either<DomainError, null>> {
    const user = await this.accountRepository.findUser({ id: data.user_id });

    if (!user) {
      return left(new UserNotFoundError());
    }

    if (!data.username && !data.email && !data.password) {
      return left(new EmptyFieldsError());
    }

    const username = (data.username && Username.create(data.username)) || Username.create(user.props.username.value);
    const email = (data.email && Email.create(data.email)) || Email.create(user.props.email.value);
    const password = (data.password && Password.create(data.password)) || Password.create(user.props.password.value);

    if (username.isLeft()) {
      return left(new InvalidUsernameError());
    }

    if (email.isLeft() || password.isLeft()) {
      return left(new InvalidEmailOrPasswordError());
    }

    await this.accountRepository.update({
      user_id: user.id,
      username: username.value.value,
      email: email.value.value,
      password: password.value.value
    });

    return right(null);
  }
}