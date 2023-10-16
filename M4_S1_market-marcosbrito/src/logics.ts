import { Request, Response } from "express";
import { Product } from "./interfaces";
import market from "./database";

const getNextId = (): number => {
  const lastProduct: Product | undefined = market
    .sort((a: Product, b: Product): number => a.id - b.id)
    .at(-1);

  if (!lastProduct) return 1;
  return lastProduct.id + 1;
};

const getExpirationDate = (): Date => {
  const currentDate = new Date();
  const expirationYear = currentDate.getFullYear() + 1;
  const expirationDate = new Date(
    expirationYear,
    currentDate.getMonth(),
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getMilliseconds()
  );

  return expirationDate;
};

const createProduct = (req: Request, res: Response): Response => {
  const expirationDate = getExpirationDate();
  const newProduct: Product = {
    ...req.body,
    id: getNextId(),
    expirationDate: expirationDate,
  };

  market.push(newProduct);

  return res.status(201).json(newProduct);
};

const readProducts = (req: Request, res: Response): Response => {
  const sum = market.reduce((acc, product) => acc + Number(product.price), 0);

  return res.status(200).json({ total: sum, products: market });
};

const readProductById = (req: Request, res: Response): Response => {
  const { foundProduct } = res.locals;

  return res.status(200).json(foundProduct);
};

const updateProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  market[productIndex] = {
    ...market[productIndex],
    ...req.body,
  };

  const updatedProduct = market[productIndex];

  return res.status(200).json(updatedProduct);
};

const deleteProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  market.splice(productIndex, 1);

  return res.status(204).json();
};

export default {
  createProduct,
  readProducts,
  readProductById,
  updateProduct,
  deleteProduct,
};
