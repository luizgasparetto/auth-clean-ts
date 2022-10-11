import { Users } from "@prisma/client";
import { UserEntity, UserEntityProps } from "../../domain/entities/user-entity";

class UserEntityAdapter {
  static toDomain(object: Users): UserEntity {
    const { username, email, password, admin, created_at, updated_at } = object;

    const props: UserEntityProps = { username, email, password, admin, createdAt: created_at, updatedAt: updated_at };

    return UserEntity.create(props, object.id);
  }
}

export { UserEntityAdapter };