import { NextFunction, Request, Response, query } from "express";
import { InfosResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const verifyInfosExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { identifier } = res.locals;

  const queryResult: InfosResult = await client.query(
    'SELECT * FROM "developerInfos" WHERE "developerId" = $1;',
    [identifier]
  );

  if (queryResult.rowCount > 0) {
    throw new AppError("Developer infos already exists.", 409);
  }

  return next();
};
