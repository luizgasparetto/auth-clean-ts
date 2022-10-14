import { Maybe } from "../../../../core/shared/logic/maybe";

import { CreateAccountTokenDTO } from "../dtos/create-account-token-dto";

import { AccountTokenEntity } from "../entities/account-token-entity";

export interface IAccountTokenRepository {
  create(data: CreateAccountTokenDTO): Promise<AccountTokenEntity>;
  findByAccountIdRefreshToken(id: string, refresh_token: string): Promise<Maybe<AccountTokenEntity>>
  deleteById(id: string): Promise<void>;
}