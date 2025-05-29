import { Router } from "express";
import {
  signIn,
  signupController,
  verifyUserController,
  refreshUserController,
} from "../controllers";

import { authenticateUser } from "../middlewares";

export const authRouter = Router();

authRouter.post("/sign-up", signupController);
authRouter.get("/verify-user", verifyUserController);
authRouter.get("/refresh-user", authenticateUser, refreshUserController);
authRouter.post("/sign-in", signIn);
