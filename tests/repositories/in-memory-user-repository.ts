import { DomainError } from "../../src/core/shared/errors/domain-error";
import { Maybe } from "../../src/core/shared/logic/maybe";

import { UserEntity, UserEntityProps } from "../../src/modules/account/domain/entities/user-entity";
import { IUserRepository } from "../../src/modules/account/domain/repositories/i-user-repository";
import { Email } from "../../src/core/shared/value-objects/email";

import { CreateUserDTO } from "../../src/modules/account/domain/dtos/create-user-dto";
import { FindUserDTO } from "../../src/modules/account/domain/dtos/find-user-dto";
import { Password } from "src/core/shared/value-objects/password";

// TODO - Remove DomainError
export class InMemoryUserRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async create(data: CreateUserDTO): Promise<UserEntity> {
    const { username } = data;

    const email = Email.create(data.email).value as Email;
    const password = Password.create(data.password).value as Password;

    const userExists = await this.findUser({ username, email: email.value });

    if (userExists instanceof UserEntity) {
      throw new DomainError("User already exists");
    }

    const props: UserEntityProps = { username, email, password, admin: false, createdAt: new Date() };

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