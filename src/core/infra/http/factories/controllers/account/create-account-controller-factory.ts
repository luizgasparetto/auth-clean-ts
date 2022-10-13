import { Controller } from "src/core/shared/contracts/controller";

import { AccountRepositoryImpl } from "../../../../../../modules/account/application/repositories/account-repository-impl";
import { CreateAccountUsecase } from "../../../../../../modules/account/domain/usecases/create-account-usecase";
import { CreateAccountController } from "../../../../../../modules/account/presentation/controllers/create-account-controller";

export class CreateAccountControllerFactory {
  static instance(): Controller {
    const accountRepository = new AccountRepositoryImpl();

    const createAccountUsecase = new CreateAccountUsecase(accountRepository);

    return new CreateAccountController(createAccountUsecase);
  }
}