import { Schema, model, Model, models } from "mongoose";

export enum UserRoleEnum {
  USER = "User",
  ADMIN = "Admin",
}

type userSchemaType = {
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRoleEnum;
  orderedFoods: Schema.Types.ObjectId[];
  ttl: Date;
  isVerified: boolean;
};
const userSchema = new Schema<userSchemaType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    phoneNumber: { type: String },
    orderedFoods: [
      { type: Schema.Types.ObjectId, ref: "FoodOrder", required: true },
    ],
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.USER,
    },
    ttl: { type: Date, default: Date.now() + 24 * 60 * 60 * 1000 },
  },
  { timestamps: true }
);

export const UserModel: Model<userSchemaType> =
  models["User"] || model("User", userSchema);
