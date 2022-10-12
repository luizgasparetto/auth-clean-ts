import { Controller } from "../../../../core/shared/contracts/controller";
import { HttpResponse } from "../../../../core/infra/adapters/http_response";

import { CreateAccountUsecase } from "../../domain/usecases/create-user/create-account-usecase";
import { CreateUserDTO } from "../../domain/dtos/create-user-dto";


export class CreateAccountController implements Controller<CreateUserDTO> {

  constructor(
    private createAccountUsecase: CreateAccountUsecase
  ) { }

  async handle(request: CreateUserDTO): Promise<HttpResponse> {
    const { username, email, password } = request;

    const result = await this.createAccountUsecase.execute({ username, email, password });

    if (result.isLeft()) {
      return HttpResponse.badRequest({ error: result.value.message });
    }

    return HttpResponse.ok({ message: "User created successfully" });
  }
}