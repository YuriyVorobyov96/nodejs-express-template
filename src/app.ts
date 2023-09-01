import 'reflect-metadata';

import config from 'config';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';

import TYPES from './common/dependency-injection/types';
import { IHook } from './common/interfaces/hook.interface';
import { ILogger } from './common/interfaces/logger.interface';
import { TPort } from './common/types/port.type';
import { IDatabaseService } from './database/interfaces/database.service.interface';
import WWW from './www';

const PORT: TPort = config.get('app.port');

@injectable()
export default class App {
  private app: Express;

  private server: Server;

  private port: TPort;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IDatabaseService)
    private database: IDatabaseService<DataSource>,
    @inject(TYPES.UseRoutes) private useRoutes: IHook,
    @inject(TYPES.UseExceptionFilters) private useExceptionFilters: IHook,
    @inject(TYPES.UseMiddlewares) private useMiddlewares: IHook,
  ) {
    this.app = express();

    this.port = WWW.normalizePort(PORT);
  }

  public async init(): Promise<void> {
    this.useMiddlewares.execute(this.app);
    this.useRoutes.execute(this.app);
    this.useExceptionFilters.execute(this.app);

    await this.database.connect();

    this.server = this.app.listen(this.port);

    process.on('SIGTERM', () => this.close());

    this.logger.log(`[App] Server started at port: ${this.port}`);
  }

  private async close(): Promise<void> {
    await this.database.disconnect();

    this.server.close(() => {
      this.logger.log(`[App] Server closed`);
    });
  }
}
