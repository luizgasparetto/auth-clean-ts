import { Maybe } from "../../../../core/shared/logic/maybe";

import { CreateUserDTO } from "../dtos/create-user-dto";
import { FindUserDTO } from "../dtos/find-user-dto";

import { UserEntity } from "../entities/user-entity";

export interface IAccountRepository {
  create(data: CreateUserDTO): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findUser(data: FindUserDTO): Promise<Maybe<UserEntity>>;
}