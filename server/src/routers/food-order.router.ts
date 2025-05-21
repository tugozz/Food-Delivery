import {
  createNewOrderController,
  getAllOrdersController,
} from "../controllers";
import { Router } from "express";

export const foodOrderRouter = Router();

foodOrderRouter
  .route("/")
  .post(createNewOrderController)
  .get(getAllOrdersController);
