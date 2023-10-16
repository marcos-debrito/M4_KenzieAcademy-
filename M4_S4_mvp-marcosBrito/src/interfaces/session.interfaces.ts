import { z } from "zod";
import { sessionSchema } from "../schemas";

type SessionSchema = z.infer<typeof sessionSchema>;
type SessionReturn = { token: string };

export { SessionSchema, SessionReturn };
