import { QueryResult } from "pg";

type Infos = {
  id: number;
  developerSince: Date;
  preferredOS: string;
  developerId: Number;
};

type InfosResult = QueryResult<Infos>;
type InfosCreate = Omit<Infos, "id">;

export { Infos, InfosResult, InfosCreate };
