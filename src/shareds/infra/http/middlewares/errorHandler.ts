import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  const message = err.message || "Erro interno do servidor";

  res.status(500).json({
    message: message,
  });
};
