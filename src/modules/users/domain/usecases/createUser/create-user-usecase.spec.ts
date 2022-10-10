import { UserRepositoryImpl } from "src/modules/users/infra/repositories/UserRepositoryImpl";

import { IUserRepository } from "../../repositories/i-user-repository";
import { CreateUserUseCase } from "./create-user-usecase";

describe('Create user usecase', () => {
  let userRepository: IUserRepository;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryImpl();
    sut = new CreateUserUseCase(userRepository);
  });

  it('should be able to create a new user', () => {

  });
});