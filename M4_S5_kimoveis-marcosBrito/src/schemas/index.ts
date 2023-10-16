import { sessionSchema } from "./session.schema";
import {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userUpdateSchema,
} from "./user.schemas";

import {
  categorySchema,
  categoryCreateSchema,
  categoryReadSchema,
} from "./category.schema";

import { scheduleSchema, scheduleSchemaCreate } from "./schedule.schemas";

import {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
} from "./realEstate.schema";

import { addressesSchema, addressesSchemaCreate } from "./addresses.schema";

export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  sessionSchema,
  userUpdateSchema,
  categorySchema,
  categoryCreateSchema,
  categoryReadSchema,
  scheduleSchema,
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  addressesSchema,
  addressesSchemaCreate,
  scheduleSchemaCreate,
};
