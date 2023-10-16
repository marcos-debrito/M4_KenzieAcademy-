import { z } from "zod";
import { movieCreateSchema } from "../schemas";
import { Movie } from "../entities";
import { DeepPartial, Repository } from "typeorm";

type movieCreate = z.infer<typeof movieCreateSchema>;
type moviesRead = Array<Movie>;
type movieUpdate = DeepPartial<Movie>;

type MovieRepo = Repository<Movie>;

export { movieCreate, moviesRead, MovieRepo, movieUpdate };
