import { Either } from "../../../../core/logic/either";
import { Maybe } from "../../../../core/logic/maybe";

import { AppError } from "src/core/shared/errors/AppError";
import { CreateUserDTO } from "../dtos/create-user-dto";

import { UserEntity } from "../entities/UserEntity";
import { FindUserDTO } from "../dtos/find-user-dto";

interface IUserRepository {
  create(data: CreateUserDTO): Promise<Either<AppError, UserEntity>>;
  delete(id: string): Promise<void>;

  findUser(data: FindUserDTO): Promise<Maybe<UserEntity>>;
}

export { IUserRepository };