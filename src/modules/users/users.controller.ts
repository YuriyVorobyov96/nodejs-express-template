import { NextFunction, Request, Response } from 'express';

import AController from '../../common/base/base.controller';
import { ILogger } from '../../common/interfaces/logger.interface';

export default class UsersController extends AController {
  constructor(logger: ILogger) {
    super(logger);

    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
      },
    ]);
  }

  public login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'login');
  }

  public register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register');
  }
}
