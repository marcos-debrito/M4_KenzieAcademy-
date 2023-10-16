import { NextFunction, Request, Response } from "express";
export default class AppError extends Error {
  constructor(public message: string, public status: number = 400) {
    super(message);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal Server Error." });
};
