import { HttpResponse } from "src/core/infra/protocols/http_response";
import { Controller } from "../../../../core/shared/contracts/controller";
import { SendForgotPasswordEmailUsecase } from "../../domain/usecases/send-forgot-password-email-usecase";

export class SendForgotPasswordEmailController implements Controller {
  constructor(private sendForgotPasswordEmailUsecase: SendForgotPasswordEmailUsecase) { }

  async handle(request: any): Promise<HttpResponse> {
    const { user_id } = request;

    const response = await this.sendForgotPasswordEmailUsecase.execute(user_id);

    if (response.isLeft()) {
      return HttpResponse.badRequest(response.value.message);
    }

    return HttpResponse.ok("Email send successfully!");
  }
}