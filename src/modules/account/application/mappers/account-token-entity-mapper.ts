import { AccountsTokens } from "@prisma/client";

import { AccountTokenEntity, AccountTokenEntityProps } from "../../domain/entities/account-token-entity";

export class AccountTokenEntityMapper {
  static toDomain(object: AccountsTokens): AccountTokenEntity {
    const props: AccountTokenEntityProps = {
      id: object.id,
      refreshToken: object.refresh_token,
      accountId: object.account_id,
      expiresDate: object.expires_date,
      createdAt: object.created_at
    };

    const accountToken = AccountTokenEntity.create(props);

    return accountToken;
  }
}