import { NextFunction, Request, Response } from "express";

export const authorization =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    console.log("header", req.header);
    console.log("headersssss", req.headers);

    try {
      if (roles.includes(user.role)) {
        next();
        return;
      }

      res.status(400).send({
        message: "Only admin can access",
      });
      return;
    } catch (error) {
      res.status(500).send({
        message: "Aldaa garlaa",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
