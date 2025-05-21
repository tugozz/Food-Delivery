import { Request, Response } from "express";
import { foodOrderModel } from "../../models/food-order.model";

export const createNewOrderController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newOrder = await foodOrderModel.create(body);
    res.status(201).send(newOrder);
  } catch (error) {
    res.status(500).send({ message: "Failed to create order", error });
  }
};
