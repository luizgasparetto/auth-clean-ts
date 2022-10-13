import { Middleware } from "src/core/shared/contracts/middleware";
import { IAccountRepository } from "src/modules/account/domain/repositories/i-account-repository";
import { HttpResponse } from "../../protocols/http_response";

type AdminMiddlewareRequest = {
  user_id: string;
}

export class AdminMiddleware implements Middleware<AdminMiddlewareRequest> {
  constructor(
    private accountRepository: IAccountRepository
  ) {}

  async handle(httpRequest: AdminMiddlewareRequest): Promise<HttpResponse> {
    const { user_id } = httpRequest;

    const account = await this.accountRepository.findUser({ id: user_id });

    if (account?.props.admin) {
      return HttpResponse.ok({ message: "User is admin"});
    }

    return HttpResponse.unauthorized("Access denied");
  }
}