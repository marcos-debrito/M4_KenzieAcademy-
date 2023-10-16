import format from "pg-format";
import { client } from "../database";
import {
  Course,
  CourseCreate,
  CourseResult,
  UserInCourse,
} from "../interfaces";
import { QueryResult } from "pg";

const create = async (data: CourseCreate): Promise<Course> => {
  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const query: CourseResult = await client.query(queryFormat);
  return query.rows[0];
};

const read = async (): Promise<any> => {
  const query: CourseResult = await client.query('SELECT * FROM "courses";');

  return query.rows;
};

const addUser = async (courseId: number, userId: number): Promise<string> => {
  const queryString: string = `
  INSERT INTO "userCourses"
     ("courseId", "userId")
    VALUES ($1, $2);
  `;

  await client.query(queryString, [courseId, userId]);

  return "User successfully vinculed to course";
};

const inativeUser = async (courseId: number, userId: number): Promise<any> => {
  const queryString: string = `
      UPDATE "userCourses" SET active = false  
      WHERE "courseId" = $1 AND "userId" = $2;
  `;

  await client.query(queryString, [courseId, userId]);

  return;
};

const readUserInCourse = async (courseId: number): Promise<UserInCourse[]> => {
  const queryString: string = `
    SELECT 
        uc."userId" AS "userId",
        us.name AS "userName",
        uc."courseId" AS "courseId",
        c.name AS "courseName",
        c.description AS "courseDescription",
        uc.active AS "userActiveInCourse"
    FROM "userCourses" AS uc
    JOIN "users" AS us 
        ON uc."userId" = us.id
    JOIN courses AS c 
        ON uc."courseId" = c.id
    WHERE "courseId" = $1;`;

  const query: QueryResult<UserInCourse> = await client.query(queryString, [
    courseId,
  ]);
  return query.rows;
};

export default { create, read, addUser, inativeUser, readUserInCourse };
