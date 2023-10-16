import { Request, Response } from "express";
import { scheduleServices } from "../services";
import { Schedule } from "../entities";

const create = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);

  const schedule: string = await scheduleServices.create(req.body, userId);

  return res.status(201).json({ message: schedule });
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;
  const schedules = await scheduleServices.read(id);

  return res.status(200).json(schedules);
};

export default { create, read };
