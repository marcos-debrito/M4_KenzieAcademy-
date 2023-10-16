import { Request, Response } from "express";
import { Course, CourseRead, UserInCourse } from "../interfaces";
import courseServices from "../services/course.services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const course: Course = await courseServices.create(req.body);
  return res.status(201).json(course);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const courses: Array<CourseRead> = await courseServices.read();
  return res.status(200).json(courses);
};

const addUser = async (req: Request, res: Response): Promise<Response> => {
  const { courseId, userId } = res.locals;
  const added: string = await courseServices.addUser(courseId, userId);

  return res.status(201).json({ message: added });
};

const inativeUser = async (req: Request, res: Response): Promise<Response> => {
  const { courseId, userId } = res.locals;
  const message: string = await courseServices.inativeUser(courseId, userId);

  return res.status(204).json({ message: message });
};

const readUserInCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { courseId } = res.locals;

  const users: Array<UserInCourse> = await courseServices.readUserInCourse(
    courseId
  );
  return res.status(200).json(users);
};

export default { create, read, addUser, inativeUser, readUserInCourse };
