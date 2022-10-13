import { Router } from "express";
import { accountRoutes } from "./account.routes";
import { sessionRoutes } from "./session.routes";

const router = Router();

router.use('/session', sessionRoutes);
router.use("/account", accountRoutes);

export { router };