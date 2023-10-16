import { QueryResult } from "pg";

interface movie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

type movieCreate = Omit<movie, "id">;
type movieResult = QueryResult<movie>;

export { movie, movieCreate, movieResult };
