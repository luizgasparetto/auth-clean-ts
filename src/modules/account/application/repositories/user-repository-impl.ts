import { prisma } from "../../../../core/infra/prisma/client";
import { Maybe } from "../../../../core/shared/logic/maybe";

import { CreateUserDTO } from "../../domain/dtos/create-user-dto";
import { FindUserDTO } from "../../domain/dtos/find-user-dto";

import { UserEntity } from "../../domain/entities/user-entity";
import { IUserRepository } from "../../domain/repositories/i-user-repository";
import { UserEntityMapper } from "../mappers/user-entity-mapper";

import { BCryptCryptographyServiceImpl } from "../../../../core/shared/services/cryptography/bcrypt-cryptography-service-impl";

export class UserRepositoryImpl implements IUserRepository {
  async create(data: CreateUserDTO): Promise<UserEntity> {
    const { username, email, password } = data;

    const hashPassword = await new BCryptCryptographyServiceImpl().hash(password);

    const user = await prisma.users.create({ data: { username, email, password: hashPassword } });

    return UserEntityMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await prisma.users.delete({ where: { id } });
  }

  async findUser(data: FindUserDTO): Promise<Maybe<UserEntity>> {
    const { id, username, email } = data;

    const user = await prisma.users.findFirst({ where: { OR: [{ id }, { username }, { email }] } });

    if (!user) return null;

    return UserEntityMapper.toDomain(user);
  }
}