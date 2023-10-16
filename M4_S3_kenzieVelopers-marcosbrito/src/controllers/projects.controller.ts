import { Request, Response } from "express";
import { Projects } from "../interfaces";
import { projectsService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const projects: Projects = await projectsService.create(req.body);

  return res.status(201).json(projects);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.params.id);
  const project: Projects = await projectsService.retrieve(req.params.id);

  return res.status(200).json(project);
};

const partialUpdate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;
  const { id } = req.params;

  const projects: Projects = await projectsService.partialUpdate(id, body);

  return res.status(200).json(projects);
};

export default { create, retrieve, partialUpdate };
