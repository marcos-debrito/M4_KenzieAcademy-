import { sign } from "jsonwebtoken";
import { client } from "../database";
import { AppError } from "../errors";
import { SessionReturn, SessionSchema, User, UserResult } from "../interfaces";
import { compareSync } from "bcryptjs";

const create = async (data: SessionSchema): Promise<SessionReturn> => {
  const query: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1;',
    [data.email]
  );
  if (query.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }
  const user: User = query.rows[0];

  const passwordIsValid: boolean = compareSync(data.password, user.password);

  if (!passwordIsValid) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token: token };
};

export default { create };
