import { InMemoryUserRepository } from "../../../../../../tests/repositories/in-memory-account-repository";

import { CreateUserDTO } from "../../dtos/create-user-dto";

import { DeleteAccountUsecase } from "./delete-account-usecase";


describe("Delete Account Usecase", () => {
  let userRepository: InMemoryUserRepository;
  let sut: DeleteAccountUsecase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new DeleteAccountUsecase(userRepository);
  });

  it("should be able to delete an existent account", async () => {
    const createUserDTO: CreateUserDTO = { username: 'test', email: 'email@email.com', password: '1984781783L' };

    const user = await userRepository.create(createUserDTO);

    const response = await sut.execute(user.id);

    expect(response.value).toBeNull();
  });
});