import express, { Express } from 'express';
import { Server } from 'http';

import LoggerService from './common/logger/logger.sevice';

export default class App {
  private app: Express;

  private server: Server;

  private port: number;

  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 3000;
    this.logger = logger;
  }

  private useMiddleware(): void { }

  private useRoutes(): void { }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();

    this.server = this.app.listen(this.port);

    this.logger.log(`Server started at port: ${this.port}`);
  }
}
