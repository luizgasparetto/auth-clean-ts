import { Router } from "express";

import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";
import { AuthenticateAccountControllerFactory } from "../factories/controllers/account/authenticate-account-controller-factory";
import { RefreshTokenControllerFactory } from "../factories/controllers/account/refresh-token-controller-factory";

const sessionRoutes = Router();

sessionRoutes.post("/", ExpressRouteAdapter.adapt(AuthenticateAccountControllerFactory.instance()));
sessionRoutes.post("/refresh", ExpressRouteAdapter.adapt(RefreshTokenControllerFactory.instance()));

export { sessionRoutes };