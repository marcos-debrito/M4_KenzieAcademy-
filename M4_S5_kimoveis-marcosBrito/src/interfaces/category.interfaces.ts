import { z } from "zod";
import { categoryCreateSchema, categoryReadSchema } from "../schemas";
import { Repository } from "typeorm";

import { Category } from "../entities";

type CategoryCreate = z.infer<typeof categoryCreateSchema>;
type CategoryRead = z.infer<typeof categoryReadSchema>;

type CategoryRepo = Repository<Category>;

export { CategoryCreate, CategoryRead, CategoryRepo };
