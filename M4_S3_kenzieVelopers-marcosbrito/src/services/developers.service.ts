import format from "pg-format";
import {
  DeveloperCreate,
  DeveloperResult,
  DeveloperUpdate,
  Developers,
  InfosResult,
  InfosCreate,
  Infos
} from "../interfaces";
import { client } from "../database";

const create = async (payLoad: DeveloperCreate): Promise<Developers> => {
  const queryFormat: string = format(
    "INSERT INTO developers (%I) VALUES (%L) RETURNING *;",
    Object.keys(payLoad),
    Object.values(payLoad)
  );

  const queryResult: DeveloperResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

const retrieve = async (id: string): Promise<Developers> => {
  const query: string = `
  SELECT 
    "d"."id" AS "developerId",      
    "d"."name" AS "developerName",  
    "d"."email" AS "developerEmail",
    "di"."developerSince" AS "developerInfoDeveloperSince",  
    "di"."preferredOS" AS "developerInfoPreferredOS"
  FROM "developers" AS "d"
    LEFT JOIN "developerInfos" AS "di"
      ON "d"."id" = "di"."developerId"
        WHERE "d"."id" = $1;
  `;
  const queryResult: DeveloperResult = await client.query(query, [id]);

  return queryResult.rows[0];
};

const partialUpdate = async (
  id: string,
  payLoad: DeveloperUpdate
): Promise<Developers> => {
  const queryFormat: string = format(
    "UPDATE developers SET (%I) = ROW(%L) WHERE id = $1 RETURNING *;",
    Object.keys(payLoad),
    Object.values(payLoad)
  );

  const queryResult: DeveloperResult = await client.query(queryFormat, [id]);

  return queryResult.rows[0];
};

const destroy = async (id: string): Promise<void> => {
  await client.query('DELETE FROM developers WHERE "id" = $1;', [id]);
};

const createInfos = async (id: String, payLoad: InfosCreate): Promise<Infos> => {
  const newObj = {
    ...payLoad,
    id: id,
    developerId: id,
  };

  const queryFormat: string = format(
    'INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;',
    Object.keys(newObj),
    Object.values(newObj)
  );
  const queryResult: InfosResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export default { create, partialUpdate, destroy, retrieve, createInfos };
