import { Router } from "express";
import middlewares from "../middlewares";
import { realEstateCreateSchema } from "../schemas";
import realEstateControllers from "../controllers/realEstate.controllers";

export const realEstateRouter: Router = Router();

realEstateRouter.post(
  "",
  middlewares.verifyToken,
  middlewares.validadeAdmin,
  middlewares.validateBody(realEstateCreateSchema),
  realEstateControllers.create
);

realEstateRouter.get("", realEstateControllers.read);
