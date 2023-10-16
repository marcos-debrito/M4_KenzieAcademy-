import { Router } from "express";
import { userController } from "../controllers";
import { userCreateSchema } from "../schemas";
import middlewares from "../middlewares";

const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.verifyEmail,
  userController.create
);
userRouter.get(
  "",
  middlewares.verifyToken,
  middlewares.verifyUserPermission,
  userController.read
);

userRouter.get(
  "/:userId/courses",
  middlewares.verifyToken,
  middlewares.verifyUserPermission,
  middlewares.verifyIdExists,
  userController.readCourses
);

export default userRouter;
