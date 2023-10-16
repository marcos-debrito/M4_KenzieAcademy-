import { Schedule } from "../entities";

import { ScheduleCreate, ScheduleRead, tRealEstate } from "../interfaces";
import { realEstateRepo, scheduleRepo } from "../repositories";

const create = async (
  data: ScheduleCreate,
  userId: number
): Promise<string> => {
  const realEstateId = data.realEstateId;

  const dataToCreate: any = { ...data, user: userId, realEstate: realEstateId };
  const schedule: Schedule[] = scheduleRepo.create(dataToCreate);
  await scheduleRepo.save(schedule);

  return "Schedule created";
};

const read = async (id: any): Promise<tRealEstate> => {
  const realEstate: any = await realEstateRepo
    .createQueryBuilder("realEstate")
    .where("realEstate.id = :realEstateId", {
      realEstateId: id,
    })
    .leftJoinAndSelect("realEstate.address", "addresses")
    .leftJoinAndSelect("realEstate.schedules", "schedules")
    .leftJoinAndSelect("realEstate.category", "categories")
    .leftJoinAndSelect("schedules.user", "user")
    .getOne();

  realEstate.address.number = Number(realEstate.address.number);

  return realEstate;
};

export default { create, read };
