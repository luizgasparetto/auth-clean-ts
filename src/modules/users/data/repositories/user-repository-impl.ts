import { hash } from "bcryptjs";
import { prisma } from "src/core/infra/prisma/client";
import { Maybe } from "src/core/logic/maybe";

import { CreateUserDTO } from "../../domain/dtos/create-user-dto";
import { FindUserDTO } from "../../domain/dtos/find-user-dto";
import { UserEntity } from "../../domain/entities/user-entity";
import { IUserRepository } from "../../domain/repositories/i-user-repository";
import { UserEntityAdapter } from "../adapters/user-entity-adapter";

export class UserRepositoryImpl implements IUserRepository {
  async create(data: CreateUserDTO): Promise<UserEntity> {
    const { username, email, password } = data;

    const hashPassword = await hash(password, 10);

    const user = await prisma.users.create({ data: { username, email, password: hashPassword } });

    return UserEntityAdapter.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await prisma.users.delete({ where: { id } });
  }

  async findUser(data: FindUserDTO): Promise<Maybe<UserEntity>> {
    const { id, username, email } = data;

    const user = await prisma.users.findFirst({ where: { OR: [{id}, { username}, { email} ] } });

    if (!user) return null;

    return UserEntityAdapter.toDomain(user);
  }
}