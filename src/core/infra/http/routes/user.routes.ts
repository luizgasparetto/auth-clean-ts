import { Router } from "express";
import { CreateUserController } from "../../../../modules/users/presenter/controllers/create-user-controller";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.delete("/:id",)

export { userRoutes };