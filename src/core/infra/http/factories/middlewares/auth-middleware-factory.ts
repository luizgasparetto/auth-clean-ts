import { Middleware } from "src/core/shared/contracts/middleware";
import { AuthMiddleware } from "../../middlewares/auth-middleware";

export class AuthMiddlewareFactory {
  static instance(): Middleware {
    const authMiddleware = new AuthMiddleware();

    return authMiddleware;
  }
}