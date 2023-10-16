import { handleErrors } from "./handleErrors.middleware";
import { validateBody } from "./validadebody.middleware";
import { verifyNameExists } from "./verifyNameExists.middleware";
import { pagination } from "./pagination.middleware";
import { verifyIdExists } from "./verifyIdExists.middleware";

export default {
  handleErrors,
  validateBody,
  verifyNameExists,
  pagination,
  verifyIdExists,
};
