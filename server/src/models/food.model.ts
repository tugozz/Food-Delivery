import { Schema, model, Model, models } from "mongoose";

type FoodItem = {
  quantity: number;
  food: Schema.Types.ObjectId;
};
type FoodSchemaType = {
  foodName: String;
  price: Number;
  image: String;
  ingrediens: String;
  category: Schema.Types.ObjectId;
};

const FoodItemSchema = new Schema<FoodItem>(
  {
    quantity: { type: Number, required: true },
    food: { type: Schema.Types.ObjectId, required: true },
  },
  { _id: false }
);

const FoodSchema = new Schema<FoodSchemaType>(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    ingrediens: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export const Food = models.Food || model("Food", FoodSchema);
