import { ContainerModule, interfaces } from 'inversify';

import App from './app';
import TYPES from './common/dependency-injection/types';
import ExceptionFilter from './common/filters/exception.filter';
import { IExceptionFilter } from './common/interfaces/exeption.filter.interface';
import { ILogger } from './common/interfaces/logger.interface';
import { IModule } from './common/interfaces/module.interface';
import LoggerService from './common/logger/logger.sevice';
import ConfigService from './config/config.service';
import { IConfigService } from './config/interfaces/config.service.interface';
import DATA_SOURCE from './database/data-source';
import { IDatabaseService } from './database/interfaces/database.service.interface';
import TypeOrmService from './database/typeorm.service';

export default class AppModule implements IModule {
  public init(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
      bind<IExceptionFilter>(TYPES.ExceptionFilter)
        .to(ExceptionFilter)
        .inSingletonScope();
      bind<IConfigService>(TYPES.ConfigService)
        .to(ConfigService)
        .inSingletonScope();
      bind<IDatabaseService<typeof DATA_SOURCE>>(TYPES.IDatabaseService)
        .to(TypeOrmService)
        .inSingletonScope();
      bind<App>(TYPES.Application).to(App).inSingletonScope();
    });
  }
}
