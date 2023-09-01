import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import AController from '../../common/base/base.controller';
import HttpError from '../../common/classes/http-error.class';
import TYPES from '../../common/dependency-injection/types';
import AuthGuard from '../../common/guards/auth.guard';
import { ILogger } from '../../common/interfaces/logger.interface';
import ValidateMiddleware from '../../common/middlewares/validate.middleware';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import { IUsersController } from './interfaces/users.controller.interface';
import { IUsersService } from './interfaces/users.service.interface';

@injectable()
export default class UsersController
  extends AController
  implements IUsersController
{
  constructor(
    @inject(TYPES.ILogger) logger: ILogger,
    @inject(TYPES.UsersService) private usersService: IUsersService,
  ) {
    super(logger);

    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
      {
        path: '/info',
        method: 'get',
        func: this.info,
        middlewares: [new AuthGuard()],
      },
    ]);
  }

  public async login(
    { body }: Request<unknown, unknown, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const token = await this.usersService.login(body);

    if (!token) {
      return next(
        new HttpError(StatusCodes.UNAUTHORIZED, 'Wrong data', 'login'),
      );
    }

    this.ok(res, { token });
  }

  public async register(
    { body }: Request<unknown, unknown, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = await this.usersService.create(body);

    if (!user) {
      return next(
        new HttpError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'User exists',
          'register',
        ),
      );
    }

    this.created(res);
  }

  public async info(
    req: Request<unknown, unknown, UserRegisterDto>,
    res: Response,
  ): Promise<void> {
    const info = await this.usersService.info(req.user.email);

    this.ok(res, info);
  }
}
