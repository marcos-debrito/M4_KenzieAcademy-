import { Router } from "express";
import middlewares from "../middlewares";
import { courseCreateSchema } from "../schemas";
import { courseController } from "../controllers";

const courseRouter: Router = Router();

courseRouter.post(
  "",
  middlewares.verifyToken,
  middlewares.validateBody(courseCreateSchema),
  middlewares.verifyUserPermission,
  courseController.create
);
courseRouter.get("", courseController.read);

courseRouter.post(
  "/:courseId/users/:userId",
  middlewares.verifyToken,
  middlewares.validadeAdmin,
  middlewares.verifyIdExists,
  courseController.addUser
);
courseRouter.get(
  "/:courseId/users",
  middlewares.verifyToken,
  middlewares.validadeAdmin,
  middlewares.verifyIdExists,
  courseController.readUserInCourse
);
courseRouter.delete(
  "/:courseId/users/:userId",
  middlewares.verifyToken,
  middlewares.validadeAdmin,
  middlewares.verifyIdExists,
  courseController.inativeUser
);

export default courseRouter;
