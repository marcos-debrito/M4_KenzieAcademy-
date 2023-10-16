import { Router } from "express";
import { idExists, idProjectExists } from "../middlewares";
import { projectsController } from "../controllers";

const projectsRouter: Router = Router();

projectsRouter.post("", idExists, projectsController.create);

projectsRouter.get("/:id", idProjectExists, projectsController.retrieve);
projectsRouter.patch(
  "/:id",
  idExists,
  idProjectExists,
  projectsController.partialUpdate
);

export default projectsRouter;
