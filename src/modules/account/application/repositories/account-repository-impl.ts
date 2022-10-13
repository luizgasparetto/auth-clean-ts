import { prisma } from "../../../../core/infra/prisma/client";
import { Maybe } from "../../../../core/shared/logic/maybe";

import { ICryptographyService } from "../../../../core/shared/services/cryptography/i-cryptography-service";

import { CreateUserDTO } from "../../domain/dtos/create-user-dto";
import { FindUserDTO } from "../../domain/dtos/find-user-dto";

import { AccountEntity } from "../../domain/entities/account-entity";
import { IAccountRepository } from "../../domain/repositories/i-account-repository";
import { AccountEntityMapper } from "../mappers/account-entity-mapper";

import { UpdateUserDTO } from "../../domain/dtos/update-user-dto";


export class AccountRepositoryImpl implements IAccountRepository {
  constructor(
    private criptographyService: ICryptographyService
  ) { }

  async create(data: CreateUserDTO): Promise<AccountEntity> {
    const { username, email, password } = data;

    const hashPassword = await this.criptographyService.hash(password);

    const account = await prisma.accounts.create({ data: { username, email, password: hashPassword }});

    return AccountEntityMapper.toDomain(account);
  }

  async update(data: UpdateUserDTO): Promise<void> {
    const { user_id, username, email } = data;

    await prisma.accounts.update({
      where: { id: user_id }, data: { username, email },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.accounts.delete({ where: { id } });
  }

  async findUser(data: FindUserDTO): Promise<Maybe<AccountEntity>> {
    const { id, username, email } = data;

    const account = await prisma.accounts.findFirst({ where: { OR: [{ id }, { username }, { email }] } });

    if (!account) return null;

    return AccountEntityMapper.toDomain(account);
  }
}