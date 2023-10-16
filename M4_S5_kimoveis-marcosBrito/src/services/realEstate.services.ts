import { Address, RealEstate } from "../entities";
import { AppError } from "../errors";
import { tCreateRealEsatate, tRealEstate } from "../interfaces";
import { addressRepo, categoryRepo, realEstateRepo } from "../repositories";
import { realEstateReturnSchema, realEstateSchema } from "../schemas";

const create = async (data: tCreateRealEsatate): Promise<any> => {
  const { address, categoryId, ...moreInfosEstate } = data;

  const { number, ...moreInfosAddress } = address;

  const categoryExists = await categoryRepo.findOneBy({
    id: categoryId,
  });

  if (!categoryExists) throw new AppError("Category not exists", 409);

  if (number) {
    const addressExists = await addressRepo.findOneBy({
      ...moreInfosAddress,
    });

    if (addressExists) throw new AppError("Address already exists", 409);
  }

  const addressInfos: Address = addressRepo.create({ ...address } as Address);
  await addressRepo.save(addressInfos);

  const realEstate: RealEstate = realEstateRepo.create({
    ...moreInfosEstate,
    address: addressInfos,
    category: categoryExists,
  });

  return await realEstateRepo.save(realEstate);
};

const read = async (): Promise<tRealEstate[]> => {
  const realEstates: RealEstate[] = await realEstateRepo.find({
    relations: {
      address: true,
    },
  });

  const realEstatesArray = realEstates.map((r: any) => {
    if (r.address.number) {
      r.address.number = Number(r.address.number);
    }

    return r;
  });

  return realEstatesArray;
};

export default { create, read };
