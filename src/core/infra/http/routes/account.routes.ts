import { Router } from "express";
import { ExpressMiddlewareAdapter } from "../../adapters/express-middleware-adapter";

import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";

import { AuthMiddlewareFactory } from "../factories/middlewares/auth-middleware-factory";

import { CreateAccountControllerFactory } from "../factories/controllers/account/create-account-controller-factory";
import { DeleteAccountControllerFactory } from "../factories/controllers/account/delete-account-controller-factory";

const accountRoutes = Router();

accountRoutes.post("/", ExpressRouteAdapter.adapt(CreateAccountControllerFactory.instance()));

accountRoutes.delete("/", ExpressMiddlewareAdapter.adapt(AuthMiddlewareFactory.instance()), ExpressRouteAdapter.adapt(DeleteAccountControllerFactory.instance()));

export { accountRoutes };