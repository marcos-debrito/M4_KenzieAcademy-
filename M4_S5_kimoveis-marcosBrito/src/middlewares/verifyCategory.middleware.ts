import { NextFunction, Request, Response } from "express";
import { Category } from "../entities";
import { categoryRepo } from "../repositories";
import { AppError } from "../errors";

export const verifyCategoryExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.name) {
    const foundCategory: Category | null = await categoryRepo.findOneBy({
      name: req.body.name,
    });

    if (foundCategory) throw new AppError("Category already exists", 409);
  }

  return next();
};
