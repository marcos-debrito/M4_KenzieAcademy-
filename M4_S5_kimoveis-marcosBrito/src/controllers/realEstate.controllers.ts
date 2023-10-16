import { Request, Response } from "express";
import { realEstateServices } from "../services";
import { RealEstate } from "../entities";
import { tRealEstate } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const realEstate: RealEstate = await realEstateServices.create(req.body);

  return res.status(201).json(realEstate);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const realEstates: tRealEstate[] = await realEstateServices.read();
  return res.status(200).json(realEstates);
};

export default { create, read };
