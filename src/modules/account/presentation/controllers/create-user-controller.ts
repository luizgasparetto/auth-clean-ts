import { container } from "tsyringe";

import { Controller } from "../../../../core/shared/contracts/controller";

import { CreateUserUsecase } from "../../domain/usecases/create-user/create-user-usecase";
import { CreateUserDTO } from "../../domain/dtos/create-user-dto";
import { HttpResponse } from "../../../../core/infra/adapters/http_response";

export class CreateUserController implements Controller<CreateUserDTO> {
  async handle(request: CreateUserDTO): Promise<HttpResponse> {
    const { username, email, password } = request;

    const createUserUsecase = container.resolve(CreateUserUsecase);

    const result = await createUserUsecase.execute({ username, email, password });

    if (result.isLeft()) {
      return HttpResponse.badRequest({ error: result.value.message });
    }

    return HttpResponse.ok({ message: "User created successfully" });
  }
}