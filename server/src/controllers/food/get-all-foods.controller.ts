import { Request, Response } from "express";
import { foodOrderModel } from "../../models/food-order.model";

export const getAllOrdersController = async (req: Request, res: Response) => {
  const allOrders = await foodOrderModel
    .find()
    .limit(10)
    .skip(10 * 2);

  const total = await foodOrderModel.countDocuments();
  res.status(200).send({ allOrders, total });
};
