import { Router } from "express";

import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";
import { AuthenticateAccountControllerFactory } from "../factories/controllers/account/authenticate-account-controller-factory";

const sessionRoutes = Router();

sessionRoutes.post("/session", ExpressRouteAdapter.adapt(AuthenticateAccountControllerFactory.instance()));

export { sessionRoutes };