import { BCryptCryptographyServiceImpl } from "../../../../../../core/shared/services/cryptography/bcrypt-cryptography-service-impl";
import { DayjsDateServiceImpl } from "../../../../../../core/shared/services/date/dayjs-date-service-impl";

import { AccountTokenRepositoryImpl } from "../../../../../../modules/account/application/repositories/account-token-repository-impl";
import { RefreshTokenUsecase } from "../../../../../../modules/account/domain/usecases/refresh-token-usecase";
import { RefreshTokenController } from "../../../../../../modules/account/presentation/controllers/refresh-token-controller";
import { AccountRepositoryImpl } from "../../../../../../modules/account/application/repositories/account-repository-impl";

export class RefreshTokenControllerFactory {
  static instance(): RefreshTokenController {
    const cryptographyService = new BCryptCryptographyServiceImpl();
    const dateService = new DayjsDateServiceImpl();

    const accountRepository = new AccountRepositoryImpl(cryptographyService);
    const accountTokenRepository = new AccountTokenRepositoryImpl();

    const refreshTokenUsecase = new RefreshTokenUsecase(dateService, accountRepository, accountTokenRepository);

    const refreshTokenController = new RefreshTokenController(refreshTokenUsecase);

    return refreshTokenController;
  }
}