import { Controller } from "src/core/shared/contracts/controller";

import { UserRepositoryImpl } from "../../../../../modules/account/application/repositories/user-repository-impl";
import { AuthenticateUsecase } from "../../../../../modules/account/domain/usecases/authenticate/authenticate-usecase";
import { AuthenticateController } from "../../../../../modules/account/presentation/controllers/authenticate-controller";
import { BCryptCryptographyServiceImpl } from "../../../../shared/services/cryptography/bcrypt-cryptography-service-impl";

export class AuthenticateControllerFactory {
  static instance(): Controller {
    const userRepository = new UserRepositoryImpl();
    const cryptographyService = new BCryptCryptographyServiceImpl();

    const authenticateUsecase = new AuthenticateUsecase(userRepository, cryptographyService);

    return new AuthenticateController(authenticateUsecase);
  }
}