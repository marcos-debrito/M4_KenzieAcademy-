import { z } from "zod";

const scheduleSchema = z.object({
  id: z.number().positive(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().positive(),
});

const scheduleSchemaCreate = scheduleSchema.omit({
  id: true,
});

export { scheduleSchema, scheduleSchemaCreate };
