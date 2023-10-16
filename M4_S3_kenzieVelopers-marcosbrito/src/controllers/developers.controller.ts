import { Request, Response } from "express";
import { Developers, InfosCreate } from "../interfaces";
import { developerService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developers = await developerService.create(req.body);

  return res.status(201).json(developer);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developers = await developerService.retrieve(req.params.id);

  return res.status(200).json(developer);
};

const partialUpdate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;
  const { id } = req.params;

  const developers: Developers = await developerService.partialUpdate(id, body);

  return res.status(200).json(developers);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await developerService.destroy(req.params.id);
  return res.status(204).json();
};

const createInfos = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { id } = req.params;
  const developerInfos: InfosCreate = await developerService.createInfos(id, body);
  return res.status(201).json(developerInfos);
};

export default { create, retrieve, partialUpdate, destroy, createInfos };
