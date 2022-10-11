
import { container } from "tsyringe";

import { HttpResponse } from "../../../../core/infra/adapters/http_response";
import { Controller } from "../../../../core/shared/contracts/controller";

import { AuthenticateUsecase } from "../../domain/usecases/authenticate/authenticate-usecase";

type IRequest = {
  email: string;
  password: string;
}

export class AuthenticateController implements Controller<IRequest> {
  async handle({ email, password }: IRequest): Promise<HttpResponse> {
    const authenticateUsecase = container.resolve(AuthenticateUsecase);

    const response = await authenticateUsecase.execute({ email, password });

    if (response.isLeft()) {
      return HttpResponse.badRequest(response.value.message);
    }

    return HttpResponse.ok({ token: response.value.token });
  }
}