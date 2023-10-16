import { NextFunction, Request, Response } from "express";
import { scheduleRepo } from "../repositories";
import { AppError } from "../errors";
import { Schedule } from "../entities";

export const verifySchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const schedule = req.body;

  const { realEstateId, ...moreInfos } = schedule;

  const userId: number = Number(res.locals.decoded.sub);

  const verifyUser = await scheduleRepo.find({
    relations: {
      user: true,
    },
    where: {
      user: {
        id: userId,
      },
      ...moreInfos,
    },
  });

  if (verifyUser.length > 0) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const verify = await scheduleRepo.findOneBy({
    ...moreInfos,
  });

  if (verify) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};
