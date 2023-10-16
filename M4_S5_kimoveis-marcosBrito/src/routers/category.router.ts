import { Router } from "express";
import middlewares from "../middlewares";
import { categoryCreateSchema } from "../schemas";
import { categoryControllers } from "../controllers";

export const categoryRouter: Router = Router();

categoryRouter.post(
  "",
  middlewares.verifyToken,
  middlewares.validadeAdmin,
  middlewares.validateBody(categoryCreateSchema),
  middlewares.verifyCategoryExists,
  categoryControllers.create
);

categoryRouter.get("", categoryControllers.read);

categoryRouter.get("/:id/realEstate", categoryControllers.readByCategory);
