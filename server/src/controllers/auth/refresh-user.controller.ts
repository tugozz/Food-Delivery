import { Request, Response } from "express";

export const refreshUserController = async (req: Request, res: Response) => {
  const { _id } = req.body.user;

  const refreshToken = "hi";

  res.status(200).send({ refreshToken });
};
