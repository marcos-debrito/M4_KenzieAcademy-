import { User } from "../entities/User.entity";
import { UserCreate, UserRead, UserReturn, UserUpdate } from "../interfaces";
import { userRepo } from "../repositories";
import { userReadSchema, userReturnSchema } from "../schemas";

const create = async (data: UserCreate): Promise<UserReturn> => {
  const user: User = userRepo.create(data);
  await userRepo.save(user);

  return userReturnSchema.parse(user);
};

const read = async (): Promise<UserRead> => {
  return userReadSchema.parse(await userRepo.find());
};

const partialUpdate = async (user: User, data: UserUpdate) => {
  return await userRepo.save({ ...user, ...data });
};

const destroy = async (user: User): Promise<void> => {
  await userRepo.softRemove(user);
};
export default { create, read, destroy, partialUpdate };
