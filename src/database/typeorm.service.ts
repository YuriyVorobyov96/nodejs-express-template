import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';

import TYPES from '../common/dependency-injection/types';
import { ILogger } from '../common/interfaces/logger.interface';
import DATA_SOURCE from './data-source';
import { IDatabaseService } from './interfaces/database.service.interface';

@injectable()
export default class TypeOrmService implements IDatabaseService<DataSource> {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  public async connect(): Promise<void> {
    try {
      await DATA_SOURCE.initialize();

      this.logger.log('[TypeOrm] Open connection to database');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `[TypeOrm] Error during Data Source initialization: ${e.message}`,
        );
      }
    }
  }

  public async disconnect(): Promise<void> {
    try {
      DATA_SOURCE.destroy();

      this.logger.log('[TypeOrm] Close connection to database');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `[TypeOrm] Error during closing connection to database: ${e.message}`,
        );
      }
    }
  }

  public getConnection(): DataSource {
    return DATA_SOURCE;
  }
}
