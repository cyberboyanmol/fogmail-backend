import { ValidationException } from '@/exceptions';
import ApiError from '@/exceptions/http.exception';
import { globalConstants } from '@/utils';
import Prisma from '@prisma/client/runtime/library';
import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import LoggerFactory from '@/lib/new-logger';
interface validationError {
  error: string;
  field: string | undefined;
}
const logger = LoggerFactory.createLogger('ErrorMiddleware');
export const errorConverter = (err: any, _req: Request, _res: Response, next: NextFunction) => {
  let exception = err;
  if (!(exception instanceof ApiError)) {
    let statusCode =
      exception.statusCode ||
      exception instanceof Prisma.PrismaClientRustPanicError ||
      exception instanceof Prisma.PrismaClientKnownRequestError ||
      exception instanceof Prisma.PrismaClientUnknownRequestError ||
      exception instanceof Prisma.PrismaClientInitializationError ||
      exception instanceof Prisma.PrismaClientValidationError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message: string = exception.message || `${httpStatus[statusCode]}`;
    exception = new ApiError(statusCode, message, false, err.stack);
  }
  next(exception);
};

export const errorMiddleware = async (error: ApiError, req: Request, res: Response, next: NextFunction) => {
  try {
    if (error instanceof ValidationException) {
      const message: validationError[] = [];
      const statusCode = 400;
      for (const err of error.errors) {
        const field = err.path.split('.').pop();
        message.push({ field, error: err.message });
      }
      logger.error(`[${req.method}] ${req.path} || StatusCode:: ${statusCode}, Message:: ${message}`);

      res.status(statusCode).json({
        status: globalConstants.status.failed,
        message,
        error: error.name,
        statusCode: statusCode,
      });
    } else {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Sorry! something went to wrong on our end, Please try again later';
      const ErrorStack = process.env.NODE_ENV !== 'production' ? error.stack : '';

      logger.error(`[${req.method}] ${req.path} || StatusCode:: ${statusCode}, Message:: ${message}`);

      if (process.env.NODE_ENV !== 'production') {
        res.status(statusCode).json({
          status: globalConstants.status.failed,
          message,
          error: error.name,
          ErrorStack,
          statusCode: statusCode,
        });
      } else {
        res.status(statusCode).json({
          status: globalConstants.status.failed,
          message,
          error: error.name,
          statusCode: statusCode,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
