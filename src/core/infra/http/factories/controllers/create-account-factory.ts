import { Controller } from "src/core/shared/contracts/controller";

import { UserRepositoryImpl } from "../../../../../modules/account/application/repositories/user-repository-impl";
import { CreateAccountUsecase } from "../../../../../modules/account/domain/usecases/create-user/create-account-usecase";
import { CreateAccountController } from "../../../../../modules/account/presentation/controllers/create-account-controller";

export class CreateAccountFactory {
  static instance(): Controller {
    const userRepository = new UserRepositoryImpl();

    const createAccountUsecase = new CreateAccountUsecase(userRepository);

    return new CreateAccountController(createAccountUsecase);
  }
}