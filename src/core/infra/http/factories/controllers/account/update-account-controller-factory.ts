import { BCryptCryptographyServiceImpl } from "../../../../../shared/services/cryptography/bcrypt-cryptography-service-impl";

import { AccountRepositoryImpl } from "../../../../../../modules/account/application/repositories/account-repository-impl";
import { UpdateAccountUsecase } from "../../../../../../modules/account/domain/usecases/update-account-usecase";
import { UpdateAccountController } from "../../../../../../modules/account/presentation/controllers/update-account-controller";

export class UpdateAccountControllerFactory {
  static instance(): UpdateAccountController {
    const criptographyService = new BCryptCryptographyServiceImpl();
    const accountRepository = new AccountRepositoryImpl(criptographyService);
    const updateAccountUsecase = new UpdateAccountUsecase(accountRepository);

    const updateAccountController = new UpdateAccountController(updateAccountUsecase);

    return updateAccountController;
  }
}