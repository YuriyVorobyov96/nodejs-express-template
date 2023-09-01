import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import HttpError from '../classes/http-error.class';
import TYPES from '../dependency-injection/types';
import { IExceptionFilter } from '../interfaces/exeption.filter.interface';
import { ILogger } from '../interfaces/logger.interface';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  public catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): void {
    if (err instanceof HttpError) {
      this.logger.error(
        `[${err.context}] Error ${err.statusCode}: ${err.message}`,
      );

      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ err: err.message });
    }
  }
}
