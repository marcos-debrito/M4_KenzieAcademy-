import { z } from "zod";

const courseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50).nonempty(),
  description: z.string().nonempty(),
});

const courseCreateSchema = courseSchema.omit({ id: true });
const courseUpdateSchema = courseCreateSchema.partial();

const courseAddUserSchema = z.object({
  id: z.number().positive(),
  active: z.boolean().default(true),
  userId: z.string().nonempty(),
  courseId: z.string().nonempty(),
});

const courseAddUserSchemaCreate = courseAddUserSchema.omit({
  userId: true,
  courseId: true,
});

export {
  courseSchema,
  courseCreateSchema,
  courseUpdateSchema,
  courseAddUserSchema,
  courseAddUserSchemaCreate,
};
