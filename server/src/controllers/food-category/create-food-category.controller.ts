import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type FoodCategoryRequestBody = {
  categoryName: string;
};
export const createFoodCategory = async (req: Request, res: Response) => {
  try {
    const categoryName = req.body as FoodCategoryRequestBody;
    const newFoodCategory = await FoodCategoryModel.create(categoryName);

    console.log("newFoodCategory", newFoodCategory);

    res
      .status(201)
      .json({ message: "Food category created succesfully", newFoodCategory });
    return;
  } catch (error) {
    console.error("Error creating food category", error);

    res.status(500).json({
      message: "Error occured while creating the food category",
      error: error instanceof Error ? error.message : "Unkown error",
    });
  }
};
