import { DomainError } from "../../src/core/shared/errors/DomainError";
import { Maybe } from "../../src/core/logic/maybe";

import { CreateUserDTO } from "../../src/modules/users/domain/dtos/create-user-dto";
import { FindUserByUsernameOrEmailDTO } from "../../src/modules/users/domain/dtos/find-user-dto";
import { UserEntity, UserEntityProps } from "../../src/modules/users/domain/entities/UserEntity";
import { IUserRepository } from "../../src/modules/users/domain/repositories/i-user-repository";
import { DeleteUserDTO } from "src/modules/users/domain/dtos/delete-user-dto";

export class InMemoryUserRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async create(data: CreateUserDTO): Promise<void> {
    const { username, email, password } = data;

    const userExists = await this.findUserByUsernameOrEmail({ username, email });

    if (userExists instanceof UserEntity) {
      throw new DomainError("User already exists");
    }

    const props: UserEntityProps = { username, email, password, admin: false, createdAt: new Date() };

    const user = UserEntity.create(props);

    this.users.push(user);
  }

  delete(data: DeleteUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findUserById(id: string): Promise<Maybe<UserEntity>> {
    throw new Error("Method not implemented.");
  }

  async findUserByUsernameOrEmail(data: FindUserByUsernameOrEmailDTO): Promise<Maybe<UserEntity>> {
    const { username, email } = data;

    const user = this.users.find(user => (username && user.props.username === username) || (email && user.props.email === email));

    return user;
  }
}