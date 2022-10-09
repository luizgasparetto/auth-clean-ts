import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserEntity } from "../entities/UserEntity";

interface IUserRepository {
  create(data: CreateUserDTO): Promise<void>;
  findById(id: string): Promise<UserEntity | null>;
}

export { IUserRepository };