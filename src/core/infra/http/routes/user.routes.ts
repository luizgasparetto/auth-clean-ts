import { Router } from "express";

import { CreateUserController } from "../../../../modules/account/presentation/controllers/create-user-controller";
import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", ExpressRouteAdapter.adapt(createUserController));
userRoutes.delete("/:id",)

export { userRoutes };