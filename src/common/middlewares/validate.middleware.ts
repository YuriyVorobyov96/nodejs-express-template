import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IMiddlware } from '../interfaces/middlware.interface';

export default class ValidateMiddleware implements IMiddlware {
  constructor(private classConstructor: ClassConstructor<object>) {}

  public async execute(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const instance = plainToInstance(this.classConstructor, body);

    const errors = await validate(instance);

    if (!errors.length) {
      return next();
    }

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(errors);
  }
}
