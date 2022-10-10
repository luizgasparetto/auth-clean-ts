import { PrismaClientEnviroment } from "../../../../../prisma/prisma-client-enviroment";
import { hash } from "bcryptjs";
import { Maybe } from "src/core/logic/maybe";


import { CreateUserDTO } from "../../domain/dtos/create-user-dto";
import { UserEntity } from "../../domain/entities/UserEntity";
import { IUserRepository } from "../../domain/repositories/i-user-repository";
import { FindUserByUsernameOrEmailDTO } from "../../domain/dtos/find-user-dto";
import { UserEntityAdapter } from "../adapters/UserEntityAdapter";
import { DeleteUserDTO } from "../../domain/dtos/delete-user-dto";

class UserRepositoryImpl implements IUserRepository {
  private prisma = new PrismaClientEnviroment().prisma;

  async create(data: CreateUserDTO): Promise<void> {
    const { username, email, password } = data;

    const hashPassword = await hash(password, 10);

    await this.prisma.users.create({ data: { username, email, password: hashPassword } });
  }

  async delete(data: DeleteUserDTO): Promise<void> {
    const { id } = data;

    await this.prisma.users.delete({ where: { id } });
  }

  async findUserById(id: string): Promise<Maybe<UserEntity>> {
    const user = await this.prisma.users.findUnique({ where: { id } });

    if (!user) return null;

    return UserEntityAdapter.fromDb(user);
  }

  async findUserByUsernameOrEmail(data: FindUserByUsernameOrEmailDTO): Promise<Maybe<UserEntity>> {
    const { username, email } = data;

    const user = await this.prisma.users.findFirst({ where: { OR: [{ username, email }] } });

    if (!user) return null;

    return UserEntityAdapter.fromDb(user);
  }
}

export { UserRepositoryImpl };