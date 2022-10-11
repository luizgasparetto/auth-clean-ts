import { container } from "tsyringe";

import { HttpResponse } from "src/core/infra/types/http-response";
import { Controller } from "src/core/shared/contracts/controller";

import { CreateUserUsecase } from "../../domain/usecases/create-user/create-user-usecase";
import { CreateUserDTO } from "../../domain/dtos/create-user-dto";

export class CreateUserController implements Controller<CreateUserDTO> {
  async handle(request: CreateUserDTO): Promise<HttpResponse> {
    const { username, email, password } = request;

    const createUserUsecase = container.resolve(CreateUserUsecase);

    const result = await createUserUsecase.execute({ username, email, password });

    if (result.isLeft()) {
      return { statusCode: result.value.statusCode, body: { error: result.value.message } };
    }

    return { statusCode: 200, body: { message: "User created successfully" } };
  }
}
