import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IMiddleware } from '../interfaces/middleware.interface';

export default class AuthGuard implements IMiddleware {
  public execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      return next();
    }

    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
}
