import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "./database";
import { movie } from "./interfaces";

const verifyCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { category } = req.query;

  const queryString: string = `SELECT * FROM "movies" WHERE category = $1`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [category],
  };
  const queryResult: QueryResult = await client.query(queryConfig);
  const filteredByCategory: movie | movie[] = queryResult.rows;
  if (filteredByCategory.length > 0) {
    res.locals = {
      ...res.locals,
      filteredByCategory,
    };
  }

  return next();
};

const verifyNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = req.body;

  const queryString: string = `SELECT * FROM "movies" WHERE name = $1;`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  const found: movie = queryResult.rows[0];

  if (found) {
    const message: string = "Movie name already exists!";
    return res.status(409).json({ message });
  }

  return next();
};

const verifyIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = req.params;

  const queryString: string = `SELECT * FROM "movies" WHERE id = $1;`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  const found: movie = queryResult.rows[0];
  if (!found) {
    const message: string = "Movie not found!";
    return res.status(404).json({ message });
  }

  res.locals = {
    ...res.locals,
    id,
  };

  next();
};

export { verifyCategory, verifyNameExists, verifyIdExists };
