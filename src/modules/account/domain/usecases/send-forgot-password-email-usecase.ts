import crypto from "crypto";
import path from "path";

import { DomainError } from "../../../../core/shared/errors/domain-error";
import { Either, left, right } from "../../../../core/shared/logic/Either";

import { IMailService } from "../../../../core/shared/services/mail/i-mail-service";

import { UserNotFoundError } from "../errors/user-not-found-error";

import { IAccountRepository } from "../repositories/i-account-repository";
import { IAccountTokenRepository } from "../repositories/i-account-token-repository";

export class SendForgotPasswordEmailUsecase {
  constructor(
    private mailService: IMailService,
    private accountRepository: IAccountRepository,
    private accountTokenRepository: IAccountTokenRepository,
  ) { }

  async execute(id: string): Promise<Either<DomainError, null>> {
    const account = await this.accountRepository.findUser({ id });
    const templatePath = path.resolve(__dirname, "..", "..", "presentation", "views", "emails", "forgot-password.hbs");

    if (!account) {
      return left(new UserNotFoundError());
    }

    const token = crypto.randomUUID();

    await this.accountTokenRepository.create({ accountId: account.id, refreshToken: token });

    const variables = {
      name: account.props.username.value,
      link: `${process.env.FORGOT_PASSWORD_URL}${token}`
    }

    await this.mailService.sendMail(
      account.props.email.value,
      "Password Recovery",
      variables,
      templatePath
    );

    return right(null);
  }
}