import 'reflect-metadata';

import { json } from 'body-parser';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';

import TYPES from './common/dependency-injection/types';
import ExceptionFilter from './common/filters/exeption.filter';
import { ILogger } from './common/interfaces/logger.interface';
import UsersController from './modules/users/users.controller';

@injectable()
export default class App {
  private app: Express;

  private server: Server;

  private port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UsersController) private usersController: UsersController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
  ) {
    this.app = express();
    this.port = 3000;

    this.logger = logger;
    this.usersController = usersController;
    this.exceptionFilter = exceptionFilter;
  }

  private useMiddleware(): void {
    this.app.use(json());
  }

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
