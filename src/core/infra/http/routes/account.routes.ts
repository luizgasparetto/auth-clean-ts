import { Router } from "express";

import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";
import { AuthenticateControllerFactory } from "../factories/controllers/authenticate-controller-factory";
import { CreateAccountFactory } from "../factories/controllers/create-account-factory";

const accountRoutes = Router();

accountRoutes.post("/", ExpressRouteAdapter.adapt(CreateAccountFactory.instance()));
accountRoutes.post('/auth', ExpressRouteAdapter.adapt(AuthenticateControllerFactory.instance()))

export { accountRoutes };