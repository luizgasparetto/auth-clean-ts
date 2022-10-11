import { DomainError } from "../../src/core/shared/errors/domain-error";
import { Maybe } from "../../src/core/logic/maybe";

import { CreateUserDTO } from "../../src/modules/users/domain/dtos/create-user-dto";
import { UserEntity, UserEntityProps } from "../../src/modules/users/domain/entities/user-entity";
import { IUserRepository } from "../../src/modules/users/domain/repositories/i-user-repository";
import { Email } from "../../src/core/shared/value-objects/email";
import { FindUserDTO } from "../../src/modules/users/domain/dtos/find-user-dto";

// TODO - Remove DomainError
export class InMemoryUserRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async create(data: CreateUserDTO): Promise<UserEntity> {
    const { username, email, password } = data;
    const validEmail = Email.create(email).value as Email;

    const userExists = await this.findUser({ username, email });

    if (userExists instanceof UserEntity) {
      throw new DomainError("User already exists");
    }

    const props: UserEntityProps = { username, email: validEmail, password, admin: false, createdAt: new Date() };

    const user = UserEntity.create(props);

    this.users.push(user);

    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findUser({ id });
    const userIndex = this.users.indexOf(user as UserEntity);

    this.users.splice(userIndex, 1);
  }

  async findUser(data: FindUserDTO): Promise<Maybe<UserEntity>> {
    const { id, username, email } = data;

    const user = this.users.find(user => (id && user.props.id === id) ||
      (username && user.props.username === username) ||
      (email && user.props.email.value === email)
    );

    return user;
  }
}