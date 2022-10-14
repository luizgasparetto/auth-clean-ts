import { DayjsDateServiceImpl } from "../../../../../../core/shared/services/date/dayjs-date-service-impl";

import { AccountTokenRepositoryImpl } from "../../../../../../modules/account/application/repositories/account-token-repository-impl";
import { RefreshTokenUsecase } from "../../../../../../modules/account/domain/usecases/refresh-token-usecase";
import { RefreshTokenController } from "../../../../../../modules/account/presentation/controllers/refresh-token-controller";

export class RefreshTokenControllerFactory {
  static instance(): RefreshTokenController {
    const dateService = new DayjsDateServiceImpl();

    const accountTokenRepository = new AccountTokenRepositoryImpl();

    const refreshTokenUsecase = new RefreshTokenUsecase(dateService, accountTokenRepository)

    const refreshTokenController = new RefreshTokenController(refreshTokenUsecase);

    return refreshTokenController;
  }
}