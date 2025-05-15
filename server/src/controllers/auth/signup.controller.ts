import { Request, Response } from "express";
import { UserModel } from "../../models";
import {
  encryptHash,
  generateNewToken,
  sendVerificationLink,
} from "../../utils";

type UserBody = { email: string; password: string };

export const signupController = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserBody;

  if (!email || !password) {
    res.status(400).send({ message: "Email or password required" });
    return;
  }

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    res.status(400).send({ message: "User Exists" });
  }

  const hashedPassword = encryptHash(password);

  const { _id } = await UserModel.create({
    email,
    password: hashedPassword,
  });

  const token = generateNewToken({ userId: _id });

  sendVerificationLink(
    `${req.protocol}://${req.get("host")}/auth/verify-user?token=${token}`,
    email
  );

  res.status(201).send({ message: "Success" });
};
