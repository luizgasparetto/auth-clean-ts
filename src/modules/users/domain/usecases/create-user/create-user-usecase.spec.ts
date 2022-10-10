import { InMemoryUserRepository } from "../../../../../../tests/repositories/in-memory-user-repository";
import { DomainError } from "../../../../../core/shared/errors/DomainError";

import { CreateUserDTO } from "../../dtos/create-user-dto";
import { UserEntity } from "../../entities/user-entity";

import { IUserRepository } from "../../repositories/i-user-repository";
import { CreateUserUsecase } from "./create-user-usecase";

describe('Create User Usecase', () => {
  let userRepository: IUserRepository;
  let sut: CreateUserUsecase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateUserUsecase(userRepository);
  });

  it('should be able to create a new user', async () => {
    const dto: CreateUserDTO = { username: 'test', email: 'test', password: 'test' };

    await sut.execute(dto);

    const user = await userRepository.findUserByUsernameOrEmail({ email: 'test' });

    expect(user).toBeInstanceOf(UserEntity);
  });

  it('should throw a DomainError when try to create an User with same name', async () => {
    const dto: CreateUserDTO = { username: 'test', email: 'test@test.net', password: 'test' };
    const dtoSameUsername: CreateUserDTO = { username: 'test', email: 'test@test.com', password: 'test' };

    await sut.execute(dto);

    expect(() => sut.execute(dtoSameUsername)).rejects.toBeInstanceOf(DomainError);
  });

  it('should throw a DomainError when try to create an User with same email', async () => {
    const dto: CreateUserDTO = { username: 'test_user_1', email: 'test@test.com', password: 'test' };
    const dtoSameEmail: CreateUserDTO = { username: 'test_user_2', email: 'test@test.com', password: 'test' };

    await sut.execute(dto);

    expect(() => sut.execute(dtoSameEmail)).rejects.toBeInstanceOf(DomainError);
  });
});