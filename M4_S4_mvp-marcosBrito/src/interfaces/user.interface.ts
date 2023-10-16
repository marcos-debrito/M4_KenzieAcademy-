import { QueryResult } from "pg";
import { z } from "zod";
import {
  userCreateSchema,
  userReturnSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas";

type User = z.infer<typeof userSchema>;

type UserCreate = z.infer<typeof userCreateSchema>;

type UserRead = Array<User>;

type UserUpdate = z.infer<typeof userUpdateSchema>;

type UserReturn = z.infer<typeof userReturnSchema>;

type UserResult = QueryResult<User>;

type UserInCourse = {
  userId: number;
  userName: string;
  courseId: number;
  courseName: string;
  courseDescription: string;
  userActiveInCourse: boolean;
};

export {
  User,
  UserCreate,
  UserRead,
  UserUpdate,
  UserResult,
  UserReturn,
  UserInCourse,
};
