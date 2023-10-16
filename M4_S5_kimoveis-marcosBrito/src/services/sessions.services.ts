import { compareSync } from "bcryptjs";
import { AppError } from "../errors";
import {
  SessionReturn,
  SessionSchema,
  UserCreate,
  UserReturn,
} from "../interfaces";
import { userRepo } from "../repositories";
import { User } from "../entities";
import { sign } from "jsonwebtoken";

const create = async (data: SessionSchema): Promise<SessionReturn> => {
  const loginDetails: User[] = await userRepo.find({
    where: [{ email: data.email }],
  });

  if (loginDetails.length === 0) {
    throw new AppError("Invalid credentials", 401);
  }

  const user: User = loginDetails[0];

  if (user.deletedAt !== null) throw new AppError("User Deleted", 401);

  const passwordIsValid: boolean = compareSync(data.password, user.password);

  if (!passwordIsValid) throw new AppError("Invalid credentials", 401);

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token: token };
};

export default { create };
