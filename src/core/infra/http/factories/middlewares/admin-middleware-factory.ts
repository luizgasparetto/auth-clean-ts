import { BCryptCryptographyServiceImpl } from "../../../../shared/services/cryptography/bcrypt-cryptography-service-impl";
import { AdminMiddleware } from "../../middlewares/admin-middleware";

import { AccountRepositoryImpl } from "../../../../../modules/account/application/repositories/account-repository-impl";


export class AdminMiddlewareFactory {
  static instance(): AdminMiddleware {
    const cryptographyService = new BCryptCryptographyServiceImpl();

    const accountRepository = new AccountRepositoryImpl(cryptographyService);

    const adminMiddleware = new AdminMiddleware(accountRepository);

    return adminMiddleware;
  }
}