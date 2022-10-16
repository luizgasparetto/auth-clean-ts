import { BCryptCryptographyServiceImpl } from "../../../../../../core/shared/services/cryptography/bcrypt-cryptography-service-impl";
import { EtherealMailServiceImpl } from "../../../../../../core/shared/services/mail/ethereal-mail-service-impl";

import { AccountRepositoryImpl } from "../../../../../../modules/account/application/repositories/account-repository-impl";
import { AccountTokenRepositoryImpl } from "../../../../../../modules/account/application/repositories/account-token-repository-impl";

import { SendForgotPasswordEmailUsecase } from "../../../../../../modules/account/domain/usecases/send-forgot-password-email-usecase";

import { SendForgotPasswordEmailController } from "../../../../../../modules/account/presentation/controllers/send-forgot-password-email-controller";

export class SendForgotPasswordEmailControllerFactory {
  static instance(): SendForgotPasswordEmailController {
    const mailService = new EtherealMailServiceImpl();
    const cryptographyService = new BCryptCryptographyServiceImpl();

    const accountRepository = new AccountRepositoryImpl(cryptographyService);
    const accountTokenRepository = new AccountTokenRepositoryImpl();

    const sendForgotPasswordUsecase = new SendForgotPasswordEmailUsecase(mailService, accountRepository, accountTokenRepository);

    const sendForgotPasswordEmailController = new SendForgotPasswordEmailController(sendForgotPasswordUsecase);

    return sendForgotPasswordEmailController;
  }
}