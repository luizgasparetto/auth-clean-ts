import { Router } from "express";
import { CreateUserController } from "../../../../modules/users/presentation/controllers/create-user-controller";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.delete("/:id",)

export { userRoutes };