import { InMemoryAccountRepository } from "../../application/repositories/in-memory-account-repository";

import { CreateUserDTO } from "../../../../../src/modules/account/domain/dtos/create-user-dto";

import { DeleteAccountUsecase } from "../../../../../src/modules/account/domain/usecases/delete-account-usecase";


describe("Delete Account Usecase", () => {
  let accountRepository: InMemoryAccountRepository;
  let sut: DeleteAccountUsecase;

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    sut = new DeleteAccountUsecase(accountRepository);
  });

  // it("should be able to delete an existent account", async () => {
  //   const createUserDTO: CreateUserDTO = { username: 'test', email: 'email@email.com', password: '1984781783L' };

  //   const user = await accountRepository.create(createUserDTO);

  //   const response = await sut.execute(user.id);

  //   expect(response.value).toBeNull();
  // });
});