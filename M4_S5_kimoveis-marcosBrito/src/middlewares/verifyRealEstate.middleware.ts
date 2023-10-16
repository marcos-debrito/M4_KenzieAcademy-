import { NextFunction, Request, Response } from "express";
import { realEstateRepo } from "../repositories";
import { AppError } from "../errors";

export const verifyRealEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let id: number = Number(req.params.id);
  let realEstateId = Number(req.body.realEstateId);

  if (!id) {
    id = realEstateId;
  }

  const realEstateExists = await realEstateRepo.findOneBy({
    id: id,
  });

  if (!realEstateExists) throw new AppError("RealEstate not found", 404);

  return next();
};
