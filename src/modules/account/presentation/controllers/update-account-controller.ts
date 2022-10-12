import { HttpResponse } from "src/core/infra/protocols/http_response";
import { Controller } from "../../../../core/shared/contracts/controller";

import { UpdateUserDTO } from "../../domain/dtos/update-user-dto";

export class UpdateAccountController implements Controller<UpdateUserDTO> {
  async handle(request: UpdateUserDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
}