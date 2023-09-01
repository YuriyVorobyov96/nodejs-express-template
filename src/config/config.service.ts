import { config, DotenvConfigOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import TYPES from '../common/dependency-injection/types';
import { ILogger } from '../common/interfaces/logger.interface';
import { IConfigService } from './interfaces/config.service.interface';

@injectable()
export default class ConfigService implements IConfigService {
  private config: DotenvConfigOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      this.logger.error('[ConfigService] Error at .env read');
    } else {
      this.logger.log('[ConfigService] Config init');
      this.config = result.parsed;
    }
  }

  public get(key: string): string {
    return this.config[key];
  }
}
