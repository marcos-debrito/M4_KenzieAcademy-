import { QueryConfig, QueryResult } from "pg";
import { movie, movieCreate, movieResult } from "./interfaces";
import { client } from "./database";
import { Request, Response } from "express";
import format from "pg-format";

const addMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload: movieCreate = req.body;

  const queryString: string = `
      INSERT INTO "movies" ("name", "category","duration", "price")
      VALUES($1, $2, $3, $4)
      Returning *;
      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: Object.values(payload),
  };

  const queryResult: movieResult = await client.query(queryConfig);
  const movie: movie = queryResult.rows[0];

  return res.status(201).json(movie);
};

const getMovies = async (req: Request, res: Response): Promise<Response> => {
  const { filteredByCategory } = res.locals;

  if (filteredByCategory) {
    return res.status(200).json(filteredByCategory);
  } else {
    const queryString: string = `
    SELECT * 
    FROM movies;
  `;
    const queryConfig: QueryConfig = {
      text: queryString,
    };
    const queryResult: movieResult = await client.query(queryConfig);
    const movies: movie[] = queryResult.rows;
    return res.status(200).json(movies);
  }
};

const getMoviesById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = res.locals;
  const queryString: string = `
  SELECT * 
  FROM movies
  WHERE id = $1
`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: movieResult = await client.query(queryConfig);
  const movie: movie = queryResult.rows[0];

  return res.status(200).json(movie);
};

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const { body, params } = req;

  const updateColumns: string[] = Object.keys(body);
  const updateValues: string[] = Object.values(body);

  const queryString: string = `
    UPDATE "movies"
    SET (%I) = ROW(%L)
    WHERE id = $1
    RETURNING *;
  `;

  const queryFormat: string = format(queryString, updateColumns, updateValues);

  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [params.id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  const updatedMovie: movie = queryResult.rows[0];

  return res.status(200).json(updatedMovie);
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const { id } = res.locals;

  const queryString: string = `DELETE
  FROM 
  movies 
  WHERE id = $1`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: movieResult = await client.query(queryConfig);
  const moviedeleted = queryResult;

  return res.status(204).json(moviedeleted);
};

export { addMovie, getMovies, updateMovie, getMoviesById, deleteMovie };
