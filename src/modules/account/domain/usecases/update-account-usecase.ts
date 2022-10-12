import { Domain } from "domain";
import { Either } from "src/core/shared/logic/Either";

import { UserEntity } from "../entities/user-entity";

interface IRequest {
  username?: string;
  email?: string;
  password?: string;
}

export class UpdateAccountUsecase {
  async execute(data: IRequest): Promise<Either<Domain, UserEntity>> {
    const { username } = data;
  }
}