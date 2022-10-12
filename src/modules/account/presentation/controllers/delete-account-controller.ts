import { HttpResponse } from "../../../../core/infra/protocols/http_response";
import { Controller } from "../../../../core/shared/contracts/controller";

import { DeleteAccountUsecase } from "../../domain/usecases/deleteAccount/delete-account-usecase";

type IRequest = {
  user_id: string;
}

export class DeleteAccountController implements Controller<IRequest> {
  constructor(
    private deleteAccountUsecase: DeleteAccountUsecase
  ) { }

  async handle(request: IRequest): Promise<HttpResponse> {
    const { user_id } = request;

    const result = await this.deleteAccountUsecase.execute(user_id);

    if (result.isLeft()) {
      return HttpResponse.badRequest({ message: result.value.message });
    }

    return HttpResponse.ok({ message: "User deleted successfully" });
  }
}

