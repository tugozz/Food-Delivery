import { Schema, model, Model, models } from "mongoose";

export type FoodCategoryModelType = {
  _id: Schema.Types.ObjectId;
  categoryName: string;

  createdAt: Date;
  updatedAt: Date;
};

type FoodCategorySchemaType = {
  categoryName: string;
};

const FoodCategorySchema = new Schema<FoodCategorySchemaType>(
  {
    categoryName: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const FoodCategoryModel: Model<FoodCategorySchemaType> =
  models.FoodCategory || model("FoodCategory", FoodCategorySchema);
