import { HttpResponse } from "../../../../core/infra/protocols/http_response";
import { Controller } from "../../../../core/shared/contracts/controller";

import { AuthenticateAccountUsecase } from "../../domain/usecases/authenticate-account-usecase";

type IRequest = {
  email: string;
  password: string;
}

export class AuthenticateAccountController implements Controller<IRequest> {
  constructor(
    private authenticateUsecase: AuthenticateAccountUsecase
  ) { }

  async handle(request: IRequest): Promise<HttpResponse> {
    const { email, password } = request;

    const response = await this.authenticateUsecase.execute({ email, password });

    if (response.isLeft()) {
      return HttpResponse.badRequest({ error: response.value.message });
    }

    return HttpResponse.ok(response.value);
  }
}