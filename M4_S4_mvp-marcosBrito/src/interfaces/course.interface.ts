import { QueryResult } from "pg";
import { z } from "zod";
import {
  courseCreateSchema,
  courseSchema,
  courseUpdateSchema,
} from "../schemas";

type Course = z.infer<typeof courseSchema>;

type CourseCreate = z.infer<typeof courseCreateSchema>;

type CourseRead = Array<Course>;

type CourseUpdate = z.infer<typeof courseUpdateSchema>;

type CourseResult = QueryResult<Course>

export { Course, CourseCreate, CourseRead, CourseUpdate, CourseResult };
