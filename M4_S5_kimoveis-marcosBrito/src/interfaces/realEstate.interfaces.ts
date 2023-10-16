import { Repository } from "typeorm";
import { RealEstate } from "../entities";
import { z } from "zod";
import { realEstateCreateSchema, realEstateSchema } from "../schemas";

type tRealEstate = z.infer<typeof realEstateSchema>;
type tCreateRealEsatate = z.infer<typeof realEstateCreateSchema>;

type RealEstateRepo = Repository<RealEstate>;

export { RealEstateRepo, tRealEstate, tCreateRealEsatate };
