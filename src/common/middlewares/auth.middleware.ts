import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { IMiddleware } from '../interfaces/middleware.interface';

export default class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const token = req.headers.authorization;

    if (req.headers.authorization) {
      verify(token, this.secret, (err, payload) => {
        if (err) {
          next();
        }

        req.user = payload;

        next();
      });
    } else {
      next();
    }
  }
}
