import { Schema, model, Model, models } from "mongoose";

type FoodModelType = {
  _id: Schema.Types.ObjectId;
  foodName: string;

  price: number;
  image: string;
  ingrediens: string;

  category: Schema.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
};

const FoodSchema = new Schema<FoodModelType>(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    ingrediens: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export const FoodModel: Model<FoodModelType> =
  models["Foods"] || model<FoodModelType>("Foods", FoodSchema);
