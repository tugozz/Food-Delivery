import { createNewFoodController } from "../controllers/food";

import { Router } from "express";

export const foodRouter = Router();

foodRouter.post("/", createNewFoodController);
