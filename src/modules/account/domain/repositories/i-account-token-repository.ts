import { CreateAccountTokenDTO } from "../dtos/create-account-token-dto";

import { AccountTokenEntity } from "../entities/account-token-entity";

export interface IAccountTokenRepository {
  create(data: CreateAccountTokenDTO): Promise<AccountTokenEntity>;
}