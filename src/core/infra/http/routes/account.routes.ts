import { Request, Response } from "express";
import { Router } from "express";
import { ExpressMiddlewareAdapter } from "../../adapters/express-middleware-adapter";

import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";
// import { ExpressMiddlewareAdapter } from "../../adapters/express-middleware-adapter";

import { AuthenticateControllerFactory } from "../factories/controllers/authenticate-controller-factory";
import { CreateAccountFactory } from "../factories/controllers/create-account-factory";
import { AuthMiddlewareFactory } from "../factories/middlewares/auth-middleware-factory";

const accountRoutes = Router();

accountRoutes.post("/", ExpressRouteAdapter.adapt(CreateAccountFactory.instance()));

accountRoutes.post('/auth', ExpressRouteAdapter.adapt(AuthenticateControllerFactory.instance()))

accountRoutes.get('/', ExpressMiddlewareAdapter.adapt(AuthMiddlewareFactory.instance()), (req: Request, res: Response) => {
  return res.json({ 'hello': 'World' });
})

export { accountRoutes };