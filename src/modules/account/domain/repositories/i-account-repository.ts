import { Maybe } from "../../../../core/shared/logic/maybe";

import { CreateUserDTO } from "../dtos/create-user-dto";
import { FindUserDTO } from "../dtos/find-user-dto";
import { UpdateUserDTO } from "../dtos/update-user-dto";

import { AccountEntity } from "../entities/account-entity";

export interface IAccountRepository {
  create(data: CreateUserDTO): Promise<AccountEntity>;
  update(data: UpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findUser(data: FindUserDTO): Promise<Maybe<AccountEntity>>;
}