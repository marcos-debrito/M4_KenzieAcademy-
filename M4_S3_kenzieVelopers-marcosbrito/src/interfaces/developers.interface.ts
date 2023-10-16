import { QueryResult } from "pg";

type Developers = {
  id: number;
  name: string;
  email: string;
};

type DeveloperResult = QueryResult<Developers>;
type DeveloperCreate = Omit<Developers, "id">;
type DeveloperUpdate = Partial<DeveloperCreate>;

export { Developers, DeveloperResult, DeveloperCreate, DeveloperUpdate };
