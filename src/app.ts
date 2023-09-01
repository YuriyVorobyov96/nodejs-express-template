import express, { Express } from 'express';
import { Server } from 'http';

import ExceptionFilter from './common/filters/exeption.filter';
import { ILogger } from './common/interfaces/logger.interface';
import UsersController from './modules/users/users.controller';

export default class App {
  private app: Express;

  private server: Server;

  private port: number;

  private logger: ILogger;

  private usersController: UsersController;

  private exceptionFilter: ExceptionFilter;

  constructor(
    logger: ILogger,
    usersController: UsersController,
    exceptionFilter: ExceptionFilter,
  ) {
    this.app = express();
    this.port = 3000;

    this.logger = logger;
    this.usersController = usersController;
    this.exceptionFilter = exceptionFilter;
  }

  private useMiddleware(): void { }

  private useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  private useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();

    this.server = this.app.listen(this.port);

    this.logger.log(`Server started at port: ${this.port}`);
  }
}
