import { container } from "tsyringe";

import { IUserRepository } from "src/modules/users/domain/repositories/i-user-repository";
import { UserRepositoryImpl } from "../../modules/users/infra/repositories/user-repository-impl";
import { ICryptographyService } from "../shared/services/cryptography/i-cryptography-service";
import { BCryptCryptographyServiceImpl } from "../shared/services/cryptography/bcrypt-cryptography-service-impl";
import { PrismaClientEnviroment } from "../../../prisma/prisma-client-enviroment";


container.registerSingleton<PrismaClientEnviroment>("PrismaClientEnviroment", PrismaClientEnviroment);
container.registerSingleton<ICryptographyService>("CryptographyService", BCryptCryptographyServiceImpl);

container.registerSingleton<IUserRepository>("UserRepository", UserRepositoryImpl);
