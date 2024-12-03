import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  const message = err.message || "Internal server error";

  res.status(500).json({
    message: message,
  });
};
