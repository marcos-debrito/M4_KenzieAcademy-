import { NextFunction, Request, Response } from "express";
import { CourseResult, UserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const verifyIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId, userId } = req.params;

  if (userId !== undefined) {
    const queryUser: CourseResult = await client.query(
      'SELECT * FROM "users" WHERE id = $1',
      [userId]
    );

    if (queryUser.rowCount === 0) {
      throw new AppError("User/course not found", 404);
    }
  }

  if (courseId) {
    const queryCourse: UserResult = await client.query(
      'SELECT * FROM "courses" WHERE id = $1',
      [courseId]
    );

    if (queryCourse.rowCount === 0) {
      throw new AppError("User/course not found", 404);
    }
  }

  res.locals = { ...res.locals, courseId, userId };

  return next();
};

export default verifyIdExists;
