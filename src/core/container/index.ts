import { container } from "tsyringe";

import { IUserRepository } from "src/modules/users/domain/repositories/i-user-repository";
import { UserRepositoryImpl } from "../../modules/users/infra/repositories/user-repository-impl";

container.registerSingleton<IUserRepository>("UserRepository", UserRepositoryImpl);