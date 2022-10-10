
import { CreateUserDTO } from "../../domain/dtos/create-user-dto";
import { UserEntity } from "../../domain/entities/UserEntity";
import { IUserRepository } from "../../domain/repositories/i-user-repository";

import { PrismaClientEnviroment } from "../../../../../prisma/PrismaClientEnviroment";
import { hash } from "bcryptjs";
import { Maybe } from "src/core/logic/maybe";
import { FindUserByUsernameOrEmailDTO } from "../../domain/dtos/find-user-dto";
import { UserEntityAdapter } from "../adapters/UserEntityAdapter";

class UserRepositoryImpl implements IUserRepository {

  private prisma = new PrismaClientEnviroment().prisma;

  async create(data: CreateUserDTO): Promise<void> {
    const { username, email, password } = data;

    const hashPassword = await hash(password, 10);

    await this.prisma.users.create({ data: { username, email, password: hashPassword } });
  }

  async findUserByUsernameOrEmail(data: FindUserByUsernameOrEmailDTO): Promise<Maybe<UserEntity>> {
    const { username, email } = data;

    const user = await this.prisma.users.findFirst({ where: { OR: [{ username, email }] } });

    if (!user) return null;

    return UserEntityAdapter.fromDb(user);
  }
}

export { UserRepositoryImpl };