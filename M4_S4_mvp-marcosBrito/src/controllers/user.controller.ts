import { Request, Response } from "express";
import { CourseRead, UserReturn } from "../interfaces";
import { userService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userService.create(req.body);

  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: Array<UserReturn> = await userService.read();
  return res.status(200).json(users);
};

const readCourses = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = res.locals;

  const userCourses: CourseRead = await userService.readCourses(userId);

  return res.status(200).json(userCourses);
};

export default { create, read, readCourses };
