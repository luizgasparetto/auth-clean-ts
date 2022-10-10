import { Users } from "@prisma/client";
import { UserEntity, UserEntityProps } from "../../domain/entities/UserEntity";

class UserEntityAdapter {
  static fromDb(object: Users): UserEntity {
    const { username, email, password, admin, created_at, updated_at } = object;

    const props: UserEntityProps = { username, email, password, admin, createdAt: created_at, updatedAt: updated_at };

    return UserEntity.create(props, object.id);
  }
}

export { UserEntityAdapter };