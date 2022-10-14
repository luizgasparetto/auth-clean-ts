import { Controller } from "src/core/shared/contracts/controller";

import { BCryptCryptographyServiceImpl } from "../../../../../shared/services/cryptography/bcrypt-cryptography-service-impl";
import { DayjsDateServiceImpl } from "../../../../../../core/shared/services/date/dayjs-date-service-impl";

import { AccountTokenRepositoryImpl } from "../../../../../../modules/account/application/repositories/account-token-repository-impl";
import { AccountRepositoryImpl } from "../../../../../../modules/account/application/repositories/account-repository-impl";
import { AuthenticateAccountUsecase } from "../../../../../../modules/account/domain/usecases/authenticate-account-usecase";
import { AuthenticateAccountController } from "../../../../../../modules/account/presentation/controllers/authenticate-account-controller";


export class AuthenticateAccountControllerFactory {
  static instance(): Controller {
    const cryptographyService = new BCryptCryptographyServiceImpl();
    const dateService = new DayjsDateServiceImpl();

    const accountRepository = new AccountRepositoryImpl(cryptographyService);
    const accountTokenRepository = new AccountTokenRepositoryImpl();

    const authenticateUsecase = new AuthenticateAccountUsecase(cryptographyService, dateService, accountRepository, accountTokenRepository);

    return new AuthenticateAccountController(authenticateUsecase);
  }
}