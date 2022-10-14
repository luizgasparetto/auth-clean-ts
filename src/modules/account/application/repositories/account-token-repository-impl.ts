import { prisma } from "src/core/infra/prisma/client";

import { CreateAccountTokenDTO } from "../../domain/dtos/create-account-token-dto";
import { AccountTokenEntity } from "../../domain/entities/account-token-entity";
import { IAccountTokenRepository } from "../../domain/repositories/i-account-token-repository";
import { AccountTokenEntityMapper } from "../mappers/account-token-entity-mapper";

export class AccountTokenRepository implements IAccountTokenRepository {
  async create(data: CreateAccountTokenDTO): Promise<AccountTokenEntity> {
    const { accountId, expiresDate, refreshToken } = data;

    const accountToken = await prisma.accountsTokens.create({
      data: {
        account_id: accountId,
        expires_date: expiresDate,
        refresh_token: refreshToken
      }
    });

    return AccountTokenEntityMapper.toDomain(accountToken);
  }
}