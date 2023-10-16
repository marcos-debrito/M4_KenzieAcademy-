import { z } from "zod";
import { addressesSchema, addressesSchemaCreate } from "./addresses.schema";
import { categorySchema } from "./category.schema";

const realEstateSchema = z.object({
  id: z.number().positive(),
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  address: addressesSchema,
  category: categorySchema,
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const realEstateCreateSchema = realEstateSchema
  .omit({
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
    address: true,
    category: true,
  })
  .extend({
    address: addressesSchemaCreate,
    categoryId: z.number(),
  });

const realEstateReturnSchema = realEstateSchema.omit({
  category: true,
});

export { realEstateSchema, realEstateCreateSchema, realEstateReturnSchema };
