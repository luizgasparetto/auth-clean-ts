import { container } from "tsyringe";

import { IUserRepository } from "src/modules/users/domain/repositories/IUserRepository";
import { UserRepositoryImpl } from "../../modules/users/infra/repositories/UserRepositoryImpl";

container.registerSingleton<IUserRepository>("UserRepository", UserRepositoryImpl);