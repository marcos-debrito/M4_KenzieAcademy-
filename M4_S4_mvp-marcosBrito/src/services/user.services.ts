import { client } from "../database";
import {
  CourseRead,
  CourseResult,
  User,
  UserCreate,
  UserResult,
  UserReturn,
} from "../interfaces";
import format from "pg-format";
import { userReturnSchema, userSchemaArray } from "../schemas";
import { hashSync } from "bcryptjs";
import { AppError } from "../errors";

const create = async (data: UserCreate): Promise<UserReturn> => {
  data.password = hashSync(data.password, 10);

  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const query: UserResult = await client.query(queryFormat);
  const user: User = query.rows[0];

  return userReturnSchema.parse(user);
};

const read = async (): Promise<UserReturn[]> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  const users: UserReturn[] = query.rows;

  return userSchemaArray.parse(users);
};

const readCourses = async (userId: number): Promise<CourseRead> => {
  const queryString: string = `
      SELECT 
        uc."courseId" AS "courseId",
        c.name AS "courseName",
        c.description AS "courseDescription",
        uc.active AS "userActiveInCourse",
        u.id AS "userId",
        u.name AS "userName"
      FROM "userCourses" AS uc
      JOIN "users" AS u
        ON  uc."userId" = u.id
      JOIN "courses" AS c 
        ON uc."courseId" = c.id
      WHERE u.id = $1;
    `;

  const query: CourseResult = await client.query(queryString, [userId]);

  if (query.rowCount == 0) {
    throw new AppError("No course found", 404);
  }

  return query.rows;
};

export default { create, read, readCourses };
