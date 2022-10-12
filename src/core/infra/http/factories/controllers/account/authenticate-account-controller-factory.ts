import { Controller } from "src/core/shared/contracts/controller";

import { AccountRepositoryImpl } from "../../../../../../modules/account/application/repositories/user-repository-impl";
import { AuthenticateAccountUsecase } from "../../../../../../modules/account/domain/usecases/authenticateAccount/authenticate-account-usecase";
import { AuthenticateAccountController } from "../../../../../../modules/account/presentation/controllers/authenticate-account-controller";
import { BCryptCryptographyServiceImpl } from "../../../../../shared/services/cryptography/bcrypt-cryptography-service-impl";

export class AuthenticateAccountControllerFactory {
  static instance(): Controller {
    const accountRepository = new AccountRepositoryImpl();
    const cryptographyService = new BCryptCryptographyServiceImpl();

    const authenticateUsecase = new AuthenticateAccountUsecase(accountRepository, cryptographyService);

    return new AuthenticateAccountController(authenticateUsecase);
  }
}