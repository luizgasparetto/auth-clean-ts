import { Accounts } from "@prisma/client";

import { Username } from "../../../../core/shared/value-objects/username";
import { Email } from "../../../../core/shared/value-objects/email";
import { Password } from "../../../../core/shared/value-objects/password";

import { AccountEntity, AccountEntityProps } from "../../domain/entities/account-entity";

export class AccountEntityMapper {
  static toDomain(object: Accounts): AccountEntity {
    const { admin, created_at, updated_at } = object;

    const username = Username.create(object.username).value as Username;
    const email = Email.create(object.email).value as Email;
    const password = Password.create(object.password).value as Password;

    const props: AccountEntityProps = { username, email, password, admin, createdAt: created_at, updatedAt: updated_at };

    return AccountEntity.create(props, object.id);
  }
}