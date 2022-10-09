
import { CreateUserDTO } from "../../domain/dtos/CreateUserDTO";
import { UserEntity } from "../../domain/entities/UserEntity";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

import { prisma } from "../../../../../prisma/PrismaClient";
import { UserEntityAdapter } from "../adapters/UserEntityAdapter";
import { hash } from "bcryptjs";

class UserRepositoryImpl implements IUserRepository {
  async create(data: CreateUserDTO): Promise<void> {
    const { username, email, password } = data;

    const hashPassword = await hash(password, 10);

    await prisma.users.create({ data: { username, email, password: hashPassword } });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.users.findUnique({ where: { id } });

    if (!user) return null;

    return new UserEntityAdapter().fromDb(user);
  }

  async findByEmail(id: string): Promise<UserEntity | null> {
    const user = await prisma.users.findFirst({ where: { id } });

    if (!user) return null;

    return new UserEntityAdapter().fromDb(user);
  }
}

export { UserRepositoryImpl };