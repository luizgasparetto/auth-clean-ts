import { HttpResponse } from "../../../../core/infra/adapters/http_response";
import { Controller } from "../../../../core/shared/contracts/controller";

import { AuthenticateUsecase } from "../../domain/usecases/authenticate/authenticate-usecase";

type IRequest = {
  email: string;
  password: string;
}

export class AuthenticateController implements Controller<IRequest> {
  constructor(
    private authenticateUsecase: AuthenticateUsecase
  ) { }

  async handle({ email, password }: IRequest): Promise<HttpResponse> {
    const response = await this.authenticateUsecase.execute({ email, password });

    if (response.isLeft()) {
      return HttpResponse.badRequest(response.value.message);
    }

    return HttpResponse.ok({ token: response.value.token });
  }
}