import { Express } from 'express';
import { inject, injectable } from 'inversify';

import { IUsersController } from '../../modules/users/interfaces/users.controller.interface';
import TYPES from '../dependency-injection/types';
import { IHook } from '../interfaces/hook.interface';
import healthcheck from '../tools/healthcheck';

@injectable()
export default class UseRoutes implements IHook {
  constructor(
    @inject(TYPES.IUsersController) private usersController: IUsersController,
  ) {}

  public execute(app: Express): void {
    app.use('/health', healthcheck);

    app.use('/users', this.usersController.router);
  }
}
