import { uniqueEmail } from "./uniqueEmail.middleware";
import { handleErrors } from "./handleErrors.middleware";
import { idExists } from "./idExists.middleware";
import { verifyPreferredOS } from "./verifyPreferredOS.middleware";
import { verifyInfosExists } from "./verifyInfosExists.middleware";
import { idProjectExists } from "./idExists.middleware";

export {
  uniqueEmail,
  handleErrors,
  idExists,
  idProjectExists,
  verifyPreferredOS,
  verifyInfosExists,
};
