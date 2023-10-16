import { Router } from "express";
import { developersController } from "../controllers";
import {
  idExists,
  uniqueEmail,
  verifyInfosExists,
  verifyPreferredOS,
} from "../middlewares";

const developerRouter: Router = Router();

developerRouter.post("", uniqueEmail, developersController.create);

developerRouter.get("/:id", idExists, developersController.retrieve);
developerRouter.patch("/:id", idExists, uniqueEmail, developersController.partialUpdate);
developerRouter.delete("/:id", idExists, developersController.destroy);
developerRouter.post(
  "/:id/infos",
  idExists,
  verifyPreferredOS,
  verifyInfosExists,
  developersController.createInfos
);

export default developerRouter;
