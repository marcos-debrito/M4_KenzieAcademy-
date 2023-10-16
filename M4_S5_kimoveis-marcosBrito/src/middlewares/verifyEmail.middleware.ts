import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User.entity";
import { userRepo } from "../repositories";
import { AppError } from "../errors";

export const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.email) {
    const foundEmail: User | null = await userRepo.findOneBy({
      email: req.body.email,
    });

    if (foundEmail) throw new AppError("Email already exists", 409);
  }

  return next();
};
