import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import AController from '../../common/base/base.controller';
import TYPES from '../../common/dependency-injection/types';
import { ILogger } from '../../common/interfaces/logger.interface';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import { IUsersController } from './interfaces/users.controller.interface';

@injectable()
export default class UsersController
  extends AController
  implements IUsersController
{
  constructor(@inject(TYPES.ILogger) logger: ILogger) {
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

  public login(
    req: Request<unknown, unknown, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): void {
    this.ok(res, 'login');
  }

  public register(
    req: Request<unknown, unknown, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): void {
    this.ok(res, 'register');
  }
}
