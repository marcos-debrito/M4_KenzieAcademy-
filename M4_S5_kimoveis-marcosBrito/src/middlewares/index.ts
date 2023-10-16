import { handleErros } from "./handleErrors.middleware";
import { validateBody } from "./validadeBody.middleware";
import { verifyEmailExists } from "./verifyEmail.middleware";
import { verifyToken } from "./verifyToken.middleware";
import { validadeAdmin } from "./validadeAdmin.middleware";
import { idExists } from "./idExists.middleware";
import { verifyUserPermission } from "./verifyUserPermission.middleware";
import { verifyCategoryExists } from "./verifyCategory.middleware";
import { verifyRealEstate } from "./verifyRealEstate.middleware";
import { verifySchedule } from "./verifySchedule.middleware";
import { verifyHourAndDay } from "./verifyHour.middleware";

export default {
  handleErros,
  validateBody,
  verifyEmailExists,
  verifyToken,
  validadeAdmin,
  idExists,
  verifyUserPermission,
  verifyCategoryExists,
  verifyRealEstate,
  verifySchedule,
  verifyHourAndDay,
};
