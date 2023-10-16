import { z } from "zod";
import { scheduleSchema, scheduleSchemaCreate } from "../schemas";
import { Repository } from "typeorm";
import { Schedule } from "../entities";

type ScheduleCreate = z.infer<typeof scheduleSchemaCreate>;
type ScheduleRead = z.infer<typeof scheduleSchema>;

type ScheduleRepo = Repository<Schedule>;

export { ScheduleCreate, ScheduleRepo, ScheduleRead };
