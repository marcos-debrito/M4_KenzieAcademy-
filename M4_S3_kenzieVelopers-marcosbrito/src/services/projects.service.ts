import format from "pg-format";
import { client } from "../database";
import {
  ProjectUpdate,
  Projects,
  ProjectsCreate,
  ProjectsResult,
} from "../interfaces";

const create = async (payLoad: ProjectsCreate): Promise<Projects> => {
  const queryFormat: string = format(
    "INSERT INTO projects (%I) VALUES (%L) RETURNING *;",
    Object.keys(payLoad),
    Object.values(payLoad)
  );
  const queryResult: ProjectsResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

const retrieve = async (id: string): Promise<Projects> => {
  const query: string = `
    SELECT 
        "p"."id" AS "projectId",
        "p"."name" AS "projectName",
        "p"."description" AS "projectDescription",
        "p"."repository" AS "projectRepository",
        "p"."startDate" AS "projectStartDate",
        "p"."endDate" AS "projectEndDate",
        "d"."name" AS "projectDeveloperName"
    FROM "projects" AS "p"
     JOIN "developers" AS "d"
      ON "d"."id" = "p"."developerId"
       WHERE "p"."developerId" = $1;
    `;

  const queryResult: ProjectsResult = await client.query(query, [id]);

  return queryResult.rows[0];
};

const partialUpdate = async (
  id: string,
  payLoad: ProjectUpdate
): Promise<Projects> => {
  const queryFormat: string = format(
    "UPDATE projects SET (%I) = ROW(%L) WHERE id = $1 RETURNING *;",
    Object.keys(payLoad),
    Object.values(payLoad)
  );

  const queryResult: ProjectsResult = await client.query(queryFormat, [id]);

  return queryResult.rows[0];
};

export default { create, retrieve, partialUpdate };
