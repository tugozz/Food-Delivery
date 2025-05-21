import { Schema, model, Model, models } from "mongoose";

export enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

export type FoodOrderModelItemType = {
  quantity: number;
  food: Schema.Types.ObjectId;
};

export type FoodOrderModelType = {
  totalPrice: number;
  user: Schema.Types.ObjectId;
  foodOrderItems: FoodOrderModelItemType[];
  status: FoodOrderStatusEnum;
};

const FoodOrderedItemSchema = new Schema<FoodOrderModelItemType>(
  {
    quantity: { type: Number, required: true },
    food: { type: Schema.Types.ObjectId, required: true, ref: "Foods" },
  },
  { _id: false }
);

const FoodOrderSchema = new Schema<FoodOrderModelType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },

    totalPrice: { type: Number, required: true },

    foodOrderItems: { type: [FoodOrderedItemSchema], required: true },

    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      required: true,
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

export const foodOrderModel: Model<FoodOrderModelType> =
  models.FoodOrders || model<FoodOrderModelType>("FoodOrders", FoodOrderSchema);
