import { Router } from "express";
import { ExpressMiddlewareAdapter } from "../../adapters/express-middleware-adapter";

import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";

import { AuthMiddlewareFactory } from "../factories/middlewares/auth-middleware-factory";

import { CreateAccountControllerFactory } from "../factories/controllers/account/create-account-controller-factory";
import { DeleteAccountControllerFactory } from "../factories/controllers/account/delete-account-controller-factory";
import { UpdateAccountControllerFactory } from "../factories/controllers/account/update-account-controller-factory";
import { AdminMiddlewareFactory } from "../factories/middlewares/admin-middleware-factory";

const accountRoutes = Router();

const authMiddleware = ExpressMiddlewareAdapter.adapt(AuthMiddlewareFactory.instance());
const adminMiddleware = ExpressMiddlewareAdapter.adapt(AdminMiddlewareFactory.instance());

accountRoutes.post("/", ExpressRouteAdapter.adapt(CreateAccountControllerFactory.instance()));
accountRoutes.put("/", authMiddleware, ExpressRouteAdapter.adapt(UpdateAccountControllerFactory.instance()));
accountRoutes.delete("/", authMiddleware, ExpressRouteAdapter.adapt(DeleteAccountControllerFactory.instance()));


accountRoutes.get("/", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ "Good": "News" });
})

export { accountRoutes };