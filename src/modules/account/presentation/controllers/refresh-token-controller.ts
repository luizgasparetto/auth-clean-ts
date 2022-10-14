import { HttpResponse } from "../../../../core/infra/protocols/http_response";
import { Controller } from "../../../../core/shared/contracts/controller";

import { RefreshTokenUsecase } from "../../domain/usecases/refresh-token-usecase";

interface IRequest {
  token: string;
}

export class RefreshTokenController implements Controller<IRequest> {
  constructor(
    private refreshTokenUsecase: RefreshTokenUsecase
  ) { }

  async handle(request: IRequest): Promise<HttpResponse> {
    const { token } = request;

    const response = await this.refreshTokenUsecase.execute(token);

    if (response.isLeft()) {
      return HttpResponse.unauthorized({ error: response.value.message });
    }

    return HttpResponse.created({ refreshToken: response.value.refreshToken });
  }
}