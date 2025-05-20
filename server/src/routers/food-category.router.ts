import { Router } from "express";
import { UserRoleEnum } from "../models";
import { createFoodCategory } from "../controllers";
import { authenticateUser, authorization } from "../middlewares";

export const foodCategoryRouter = Router();

foodCategoryRouter
  .route("/")
  .post(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    createFoodCategory
  );
