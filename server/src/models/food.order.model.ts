import { Schema, model, Model, models } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

type FoodOrderedItem = {
  quantity: number;
  food: Schema.Types.ObjectId;
};

type FoodOrderSchemaType = {
  totalPrice: number;
  user: Schema.Types.ObjectId;
  foodOrderedItems: FoodOrderedItem[];
  status: FoodOrderStatusEnum;
};

const FoodOrderedItemSchema = new Schema<FoodOrderedItem>(
  {
    quantity: { type: Number, required: true },
    food: { type: Schema.Types.ObjectId, required: true },
  },
  { _id: false }
);

const FoodOrderSchema = new Schema<FoodOrderSchemaType>(
  {
    totalPrice: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    foodOrderedItems: { type: [FoodOrderedItemSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      required: true,
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

export const FoodOrder =
  models.FoodOrder || model("FoodOrder", FoodOrderSchema);
