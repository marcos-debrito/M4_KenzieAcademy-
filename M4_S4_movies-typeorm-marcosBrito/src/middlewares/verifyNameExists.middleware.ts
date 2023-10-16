import { NextFunction, Request, Response } from "express";
import { Movie } from "../entities";
import { movieRepo } from "../repositories";
import { AppError } from "../errors";

export const verifyNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.name) {
    const foundMovie: Movie | null = await movieRepo.findOneBy({
      name: req.body.name,
    });

    if (foundMovie) throw new AppError("Movie already exists.", 409);
  }

  return next();
};
