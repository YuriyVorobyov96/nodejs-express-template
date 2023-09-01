import { NextFunction, Request, Response } from 'express';

import HttpError from '../classes/http-error.class';
import { IExceptionFilter } from '../interfaces/exeption.filter.interface';
import LoggerService from '../logger/logger.sevice';

export default class ExceptionFilter implements IExceptionFilter {
  constructor(private logger: LoggerService) {}

  public catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (err instanceof HttpError) {
      this.logger.error(
        `[${err.context}] Error ${err.statusCode}: ${err.message}`,
      );

      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);

      res.status(500).send({ err: err.message });
    }
  }
}