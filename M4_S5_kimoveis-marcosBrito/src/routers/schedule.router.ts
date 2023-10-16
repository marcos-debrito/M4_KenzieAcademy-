import { Router } from "express";
import { scheduleControllers } from "../controllers";
import middlewares from "../middlewares";
import { scheduleSchemaCreate } from "../schemas";

export const scheduleRouter: Router = Router();

scheduleRouter.post(
  "",
  middlewares.verifyToken,
  middlewares.validateBody(scheduleSchemaCreate),
  middlewares.verifyRealEstate,
  middlewares.verifyHourAndDay,
  middlewares.verifySchedule,

  scheduleControllers.create
);

scheduleRouter.get(
  "/realEstate/:id",
  middlewares.verifyToken,
  middlewares.validadeAdmin,
  middlewares.verifyRealEstate,
  scheduleControllers.read
);
