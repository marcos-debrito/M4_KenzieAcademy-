import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
  email: z.string().max(45).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userUpdateSchema = userSchema.partial().omit({
  id: true,
  admin: true,
});

const userReturnSchema = userSchema.omit({
  password: true,
});

const userReadSchema = userReturnSchema.array();

export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userUpdateSchema,
};
