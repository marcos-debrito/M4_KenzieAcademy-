import { QueryResult } from "pg";

type Projects = {
  id: number;
  name: string;
  description?: string;
  repository: string;
  startDate: Date;
  endDate?: Date;
  developerId: Number;
};

type ProjectsResult = QueryResult<Projects>;
type ProjectsCreate = Omit<Projects, "id">;
type ProjectUpdate = Partial<ProjectsCreate>;

export { Projects, ProjectsResult, ProjectsCreate, ProjectUpdate };
