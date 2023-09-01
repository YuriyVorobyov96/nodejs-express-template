import express, { Express } from 'express';
import { Server } from 'http';

import LoggerService from './common/logger/logger.sevice';
import UsersController from './modules/users/users.controller';

export default class App {
  private app: Express;

  private server: Server;

  private port: number;

  private logger: LoggerService;

  private usersController: UsersController;

  constructor(logger: LoggerService, usersController: UsersController) {
    this.app = express();
    this.port = 3000;

    this.logger = logger;

    this.usersController = usersController;
  }

  private useMiddleware(): void { }

  private useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();

    this.server = this.app.listen(this.port);

    this.logger.log(`Server started at port: ${this.port}`);
  }
}
