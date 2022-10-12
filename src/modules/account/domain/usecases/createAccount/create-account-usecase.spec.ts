import { InMemoryUserRepository } from "../../../../../../tests/repositories/in-memory-account-repository";

import { DomainError } from "../../../../../core/shared/errors/domain-error";

import { CreateUserDTO } from "../../dtos/create-user-dto";
import { UserEntity } from "../../entities/user-entity";

import { IUserRepository } from "../../repositories/i-account-repository";
import { CreateAccountUsecase } from "./create-account-usecase";

describe('Create User Usecase', () => {
  let userRepository: IUserRepository;
  let sut: CreateAccountUsecase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateAccountUsecase(userRepository);
  });

  it('should be able to create a new user', async () => {
    const dto: CreateUserDTO = { username: 'test', email: 'test', password: 'test' };

    await sut.execute(dto);

    const user = await userRepository.create(dto);

    expect(user).toBeInstanceOf(UserEntity);
  });

  it('should throw a DomainError when try to create an User with same name', async () => {
    const dto: CreateUserDTO = { username: 'test', email: 'test@test.net', password: 'test' };
    const dtoSameUsername: CreateUserDTO = { username: 'test', email: 'test@test.com', password: 'test' };

    await sut.execute(dto);

    const response = await sut.execute(dtoSameUsername);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(DomainError);
  });

  it('should throw a DomainError when try to create an User with same email', async () => {
    const dto: CreateUserDTO = { username: 'test_user_1', email: 'test@test.com', password: 'test' };
    const dtoSameEmail: CreateUserDTO = { username: 'test_user_2', email: 'test@test.com', password: 'test' };

    await sut.execute(dto);

    const response = await sut.execute(dtoSameEmail);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(DomainError);
  });
});