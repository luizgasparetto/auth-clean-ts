import { CreateUserDTO } from "src/modules/users/domain/dtos/CreateUserDTO";
import { UserEntity } from "src/modules/users/domain/entities/UserEntity";
import { IUserRepository } from "src/modules/users/domain/repositories/i-user-repository";

export class InMemoryUserRepository implements IUserRepository {
  private users: UserEntity[] = [];

  create(data: CreateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
}