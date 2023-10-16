import { NextFunction, Request, Response } from "express";
import { DeveloperResult, Developers, ProjectsResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const idExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const identifier = req.body.developerId || id;

  const queryResult: DeveloperResult = await client.query(
    'Select * FROM developers WHERE "id" = $1',
    [identifier]
  );

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  const foundDeveloper: Developers = queryResult.rows[0];
  res.locals = { ...res.locals, foundDeveloper, identifier };

  return next();
};

export const idProjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: ProjectsResult = await client.query(
    'SELECT * FROM developers WHERE "id" = $1',
    [id]
  );
  if (!queryResult.rowCount) {
    throw new AppError("Project not found.", 404);
  }
  return next();
};
