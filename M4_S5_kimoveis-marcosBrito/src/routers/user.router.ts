import { Router } from "express";
import middlewares from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";
import { userControllers } from "../controllers";

export const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.verifyEmailExists,
  userControllers.create
);

userRouter.get(
  "",
  middlewares.verifyToken,
  middlewares.validadeAdmin,
  userControllers.read
);

userRouter.patch(
  "/:id",
  middlewares.idExists,
  middlewares.verifyToken,
  middlewares.validateBody(userUpdateSchema),
  middlewares.verifyUserPermission,
  userControllers.partialUpdate
);

userRouter.delete(
  "/:id",
  middlewares.idExists,
  middlewares.verifyToken,
  middlewares.validadeAdmin,
  userControllers.destroy
);
