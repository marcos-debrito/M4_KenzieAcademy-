import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const verifyHourAndDay = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const hour: number = req.body.hour.substring(0, 2);

  if (hour < 8 || hour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const date: Date = new Date(req.body.date);
  const day: number = date.getDay();

  if (day == 0 || day == 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  return next();
};
