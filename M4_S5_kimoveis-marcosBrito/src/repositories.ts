import { AppDataSource } from "./data-source";
import { Address, Category, RealEstate, Schedule, User } from "./entities";
import {
  UserRepo,
  CategoryRepo,
  RealEstateRepo,
  AddressRepo,
  ScheduleRepo,
} from "./interfaces";

const userRepo: UserRepo = AppDataSource.getRepository(User);
const categoryRepo: CategoryRepo = AppDataSource.getRepository(Category);
const realEstateRepo: RealEstateRepo = AppDataSource.getRepository(RealEstate);
const addressRepo: AddressRepo = AppDataSource.getRepository(Address);
const scheduleRepo: ScheduleRepo = AppDataSource.getRepository(Schedule);

export { userRepo, categoryRepo, realEstateRepo, addressRepo, scheduleRepo };
