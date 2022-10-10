import { Maybe } from "src/core/logic/maybe";
import { CreateUserDTO } from "../dtos/create-user-dto";
import { FindUserByUsernameOrEmailDTO } from "../dtos/find-user-dto";

import { UserEntity } from "../entities/UserEntity";

interface IUserRepository {
  create(data: CreateUserDTO): Promise<void>;
  findUserByUsernameOrEmail(data: FindUserByUsernameOrEmailDTO): Promise<Maybe<UserEntity>>;
}

export { IUserRepository };