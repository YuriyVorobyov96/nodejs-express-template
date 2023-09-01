import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import TYPES from '../common/dependency-injection/types';
import { ILogger } from '../common/interfaces/logger.interface';

@injectable()
export default class PrismaService {
  public client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  public async connect(): Promise<void> {
    try {
      await this.client.$connect();

      this.logger.log('[PrismaService] Successful connection to database');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `[PrismaService] Error on connect to database ${e.message}`,
        );
      }
    }
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
