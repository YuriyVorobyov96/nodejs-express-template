import { Express } from 'express';
import { inject, injectable } from 'inversify';

import UsersController from '../../modules/users/users.controller';
import TYPES from '../dependency-injection/types';
import { IHook } from '../interfaces/hook.interface';

@injectable()
export default class UseRoutes implements IHook {
  constructor(
    @inject(TYPES.UsersController) private usersController: UsersController,
  ) {}

  public execute(app: Express): void {
    app.use('/users', this.usersController.router);
  }
}
