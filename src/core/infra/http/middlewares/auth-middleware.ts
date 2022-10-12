import { decode } from "jsonwebtoken";

import { HttpResponse } from "../../protocols/http_response";

import { Middleware } from "src/core/shared/contracts/middleware";

type AuthMiddlewareRequest = {
  accessToken: string;
}

type IPayload = {
  sub: string;
}

export class AuthMiddleware implements Middleware {
  async handle(httpRequest: AuthMiddlewareRequest): Promise<HttpResponse> {
    try {
      const { accessToken } = httpRequest;

      if (accessToken) {
        const { sub: user_id } = decode(accessToken) as IPayload;

        return HttpResponse.ok({ user_id });
      }

      return HttpResponse.forbidden({ message: 'Access denied' });
    } catch (error) {

      return HttpResponse.badRequest({ error });
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}