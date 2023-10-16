import { Request, Response } from "express";
import { categoryServices } from "../services";
import { CategoryCreate, CategoryRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const category: CategoryCreate = await categoryServices.create(req.body);
  return res.status(201).json(category);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const categories: CategoryRead = await categoryServices.read();

  return res.status(200).json(categories);
};

const readByCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  const realEstatesByCategory: any = await categoryServices.readByCategory(id);
  return res.status(200).json(realEstatesByCategory[0]);
};

export default { create, read, readByCategory };
