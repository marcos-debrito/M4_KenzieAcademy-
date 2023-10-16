import { Router } from "express";
import middlewares from "../middlewares";
import { movieCreateSchema, movieUpdateSchema } from "../schemas";
import { movieController } from "../controllers";
import { verifyIdExists } from "../middlewares/verifyIdExists.middleware";

export const movieRouter: Router = Router();

movieRouter.post(
  "",
  middlewares.validateBody(movieCreateSchema),
  middlewares.verifyNameExists,
  movieController.create
);
movieRouter.get("", middlewares.pagination, movieController.read);

movieRouter.patch(
  "/:id",
  verifyIdExists,
  middlewares.verifyNameExists,
  middlewares.validateBody(movieUpdateSchema),
  movieController.partialUpdate
);

movieRouter.delete("/:id", verifyIdExists, movieController.destroy);
