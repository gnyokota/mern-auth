import { BadRequestError } from "../utils/error.util";
import { Request, Response, NextFunction } from "express";

type CustomError = {
  message: string;
  statusCode: number;
  source?: Error;
};

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = { ...error };

  customError.message = error.message;

  if (error.statusCode === 11000) {
    const message = "Duplicated field value enter";
    //400-Bad Request
    customError = new BadRequestError(message);
  }

  res.status(customError.statusCode || 500).json({
    success: false,
    error: customError.message || "Internal Server Error",
  });
};

export default errorHandler;
