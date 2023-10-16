import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const verifyPreferredOS = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;
  if (
    body.preferredOS != "Windows" &&
    body.preferredOS != "Linux" &&
    body.preferredOS != "MacOS"
  ) {
    throw new AppError("Invalid OS option.", 400);
  }
  return next();
};
