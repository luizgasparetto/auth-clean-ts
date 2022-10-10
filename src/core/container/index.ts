import { container } from "tsyringe";

import { IUserRepository } from "src/modules/users/domain/repositories/i-user-repository";
import { UserRepositoryImpl } from "../../modules/users/infra/repositories/UserRepositoryImpl";

container.registerSingleton<IUserRepository>("UserRepository", UserRepositoryImpl);