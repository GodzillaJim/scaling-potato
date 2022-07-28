import { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import logger from "../config/logger.config";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error: any = new createError.NotFound();
  next(error);
};

export const handleError = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jsonError = {
    error: {
      statusCode: err.status || res.statusCode || 500,
      message: err.message,
    },
  };

  logger.error(
    `statusCode: ${jsonError.error.statusCode}; statusText: ${jsonError.error.message}; stacks: ${err.stack};`
  );
  res.status(jsonError.error.statusCode).json(jsonError);
};
