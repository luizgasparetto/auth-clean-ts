import { Users } from "@prisma/client";

import { Email } from "../../../../core/shared/value-objects/email";
import { Password } from "../../../../core/shared/value-objects/password";

import { UserEntity, UserEntityProps } from "../../domain/entities/user-entity";

export class UserEntityMapper {
  static toDomain(object: Users): UserEntity {
    const { username, admin, created_at, updated_at } = object;

    const email = Email.create(object.email).value as Email;
    const password = Password.create(object.password).value as Password;

    const props: UserEntityProps = { username, email, password, admin, createdAt: created_at, updatedAt: updated_at };

    return UserEntity.create(props, object.id);
  }
}