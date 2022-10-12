import { HttpResponse } from "../../../../core/infra/protocols/http_response";
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

  async handle(request: IRequest): Promise<HttpResponse> {
    const { email, password } = request;

    const response = await this.authenticateUsecase.execute({ email, password });

    if (response.isLeft()) {
      return HttpResponse.badRequest({ error: response.value.message });
    }

    return HttpResponse.ok({ accessToken: response.value.token });
  }
}