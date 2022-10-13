import { HttpResponse } from "../../../../core/infra/protocols/http_response";
import { Controller } from "../../../../core/shared/contracts/controller";

import { UpdateUserDTO } from "../../domain/dtos/update-user-dto";
import { UpdateAccountUsecase } from "../../domain/usecases/update-account-usecase";

export class UpdateAccountController implements Controller<UpdateUserDTO> {
  constructor(
    private updateAccountUsecase: UpdateAccountUsecase
  ) { }

  async handle(request: UpdateUserDTO): Promise<HttpResponse> {
    const result = await this.updateAccountUsecase.execute(request);

    if (result.isLeft()) {
      return HttpResponse.error({ error: result.value.message }, result.value.statusCode);
    }

    return HttpResponse.ok({ message: "User updated successfully" });
  }
}