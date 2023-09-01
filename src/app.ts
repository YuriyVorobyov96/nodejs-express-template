import 'reflect-metadata';

import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';

import TYPES from './common/dependency-injection/types';
import { IHook } from './common/interfaces/hook.interface';
import { ILogger } from './common/interfaces/logger.interface';
import PrismaService from './database/prisma.service';

@injectable()
export default class App {
  private app: Express;

  private server: Server;

  private port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
    @inject(TYPES.UseRoutes) private useRoutes: IHook,
    @inject(TYPES.UseExceptionFilters) private useExceptionFilters: IHook,
    @inject(TYPES.UseMiddlewares) private useMiddlewares: IHook,
  ) {
    this.app = express();
    this.port = 3000;
  }

  public async init(): Promise<void> {
    this.useMiddlewares.execute(this.app);
    this.useRoutes.execute(this.app);
    this.useExceptionFilters.execute(this.app);

    await this.prismaService.connect();

    this.server = this.app.listen(this.port);

    this.logger.log(`[App] Server started at port: ${this.port}`);
  }
}
