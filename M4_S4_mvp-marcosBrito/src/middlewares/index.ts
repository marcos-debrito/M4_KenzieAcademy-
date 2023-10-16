import handleErros from "./handleErrors";
import validateBody from "./validadeBody.middleware";
import verifyEmail from "./verifyEmail.middleware";
import verifyToken from "./verifyToken.middleware";
import verifyUserPermission from "./verifyUserPermission.middleware";
import verifyIdExists from "./verifyIdExists.middleware";
import validadeAdmin from "./validadeAdmin.middleware";

export default {
  handleErros,
  validateBody,
  verifyEmail,
  verifyToken,
  verifyUserPermission,
  verifyIdExists,
  validadeAdmin,
};
