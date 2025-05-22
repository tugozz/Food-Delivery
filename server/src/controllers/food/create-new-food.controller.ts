import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const createNewFoodController = async (req: Request, res: Response) => {
  try {
    const foodData = req.body;

    const newFood = await FoodModel.create(foodData);

    res.status(201).json({
      message: "Food created successfully",
      newFood,
    });
  } catch (error) {
    console.error("Error creating food:", error);

    res.status(500).json({
      message: "Error occured while creating food",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
