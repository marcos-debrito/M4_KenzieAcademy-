import { Category } from "../entities";
import { AppError } from "../errors";
import { CategoryCreate, CategoryRead } from "../interfaces";
import { categoryRepo } from "../repositories";
import { categoryCreateSchema } from "../schemas";

const create = async (data: Category): Promise<CategoryCreate> => {
  const category: Category = categoryRepo.create(data);
  await categoryRepo.save(category);
  return category;
};

const read = async (): Promise<CategoryRead> => {
  return await categoryRepo.find();
};

const readByCategory = async (id: number): Promise<any> => {
  const foundCategory: Category | null = await categoryRepo.findOneBy({ id });

  if (!foundCategory) throw new AppError("Category not found", 404);

  const array = await categoryRepo.find({
    relations: {
      realEstate: true,
    },
    where: {
      id: id,
    },
  });

  return array;
};

export default { create, read, readByCategory };
