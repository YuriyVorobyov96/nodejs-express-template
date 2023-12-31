import 'reflect-metadata';

import { injectable } from 'inversify';
import { Logger } from 'tslog';

import { ILogger } from '../interfaces/logger.interface';

@injectable()
export default class LoggerService implements ILogger {
  public logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: 'hidden',
      displayFunctionName: false,
    });
  }

  public log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  public error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  public warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
