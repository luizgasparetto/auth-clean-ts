import { container } from "tsyringe";

import { IUserRepository } from "src/modules/account/domain/repositories/i-user-repository";
import { UserRepositoryImpl } from "../../../modules/account/data/repositories/user-repository-impl";
import { ICryptographyService } from "../../shared/services/cryptography/i-cryptography-service";
import { BCryptCryptographyServiceImpl } from "../../shared/services/cryptography/bcrypt-cryptography-service-impl";


container.registerSingleton<ICryptographyService>("CryptographyService", BCryptCryptographyServiceImpl);

container.registerSingleton<IUserRepository>("UserRepository", UserRepositoryImpl);
