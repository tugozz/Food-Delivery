import { authenticateUser } from "../middlewares";
import { Router } from "express";
import { createFoodCategory } from "../controllers";

export const foodCategoryRouter = Router();

foodCategoryRouter.route("/").post(authenticateUser, createFoodCategory);
