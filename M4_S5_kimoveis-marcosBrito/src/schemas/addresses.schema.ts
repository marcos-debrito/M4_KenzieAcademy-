import { z } from "zod";

const addressesSchema = z.object({
  id: z.number().positive(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.number().nullable(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const addressesSchemaCreate = addressesSchema.omit({
  id: true,
});

export { addressesSchema, addressesSchemaCreate };
