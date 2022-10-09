
import { CreateUserDTO } from "../../domain/dtos/CreateUserDTO";
import { UserEntity } from "../../domain/entities/UserEntity";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

import { prisma } from "prisma/PrismaClient";
import { UserEntityAdapter } from "../adapters/UserEntityAdapter";

class UserRepositoryImpl implements IUserRepository {
  create(data: CreateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.users.findUnique({ where: { id } });

    if (!user) return null;

    return new UserEntityAdapter().fromDb(user);
  }
}

export { UserRepositoryImpl };