import { Router } from "express";
import {
  signInController,
  signUpController,
  verifyUserController,
  refreshUserController,
} from "../../controllers/auth";

import { authenticateUser } from "../../src /middlewares";

export const authRouter = Router();

authRouter.post("/sign-up", signUpController);
authRouter.get("/verify-user", verifyUserController);
authRouter.get("/refresh-user", authenticateUser, refreshUserController);
authRouter.post("/sign-in", signInController);
