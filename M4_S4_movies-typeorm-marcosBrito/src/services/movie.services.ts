import { Movie } from "../entities";
import {
  Pagination,
  PaginationParams,
  movieCreate,
  movieUpdate,
  moviesRead,
} from "../interfaces";
import { movieRepo } from "../repositories";

const create = async (data: movieCreate): Promise<Movie> => {
  return await movieRepo.save(data);
};

const read = async ({
  page,
  perPage,
  nextPage,
  prevPage,
  order,
  sort,
}: PaginationParams): Promise<Pagination> => {
  const [movies, count]: Array<moviesRead | number> =
    await movieRepo.findAndCount({
      order: { [sort]: order },
      skip: page,
      take: perPage,
    });

  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    count,
    data: movies,
  };
};

const partialUpdate = async (
  movie: Movie,
  data: movieUpdate
): Promise<Movie> => {
  return await movieRepo.save({ ...movie, ...data });
};

const destroy = async (movie: Movie): Promise<void> => {
  await movieRepo.remove(movie);
};

export default { create, read, destroy, partialUpdate };
