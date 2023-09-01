import { Express } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '../dependency-injection/types';
import { IExceptionFilter } from '../interfaces/exeption.filter.interface';
import { IHook } from '../interfaces/hook.interface';

@injectable()
export default class UseExceptionFilters implements IHook {
  constructor(
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
  ) {}

  public execute(app: Express): void {
    app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }
}
