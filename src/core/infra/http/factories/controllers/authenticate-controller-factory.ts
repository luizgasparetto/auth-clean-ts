import { Controller } from "src/core/shared/contracts/controller";

import { UserRepositoryImpl } from "../../../../../modules/account/application/repositories/user-repository-impl";
import { AuthenticateUsecase } from "../../../../../modules/account/domain/usecases/authenticate/authenticate-usecase";
import { AuthenticateController } from "../../../../../modules/account/presentation/controllers/authenticate-controller";

export class AuthenticateControllerFactory {
  static instance(): Controller {
    const userRepository = new UserRepositoryImpl();

    const authenticateUsecase = new AuthenticateUsecase(userRepository);

    return new AuthenticateController(authenticateUsecase);
  }
}