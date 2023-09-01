import { Container, ContainerModule, interfaces } from 'inversify';

import App from './app';
import TYPES from './common/dependency-injection/types';
import ExceptionFilter from './common/filters/exception.filter';
import { IExceptionFilter } from './common/interfaces/exeption.filter.interface';
import { ILogger } from './common/interfaces/logger.interface';
import LoggerService from './common/logger/logger.sevice';
import ConfigService from './config/config.service';
import { IConfigService } from './config/interfaces/config.service.interface';
import PrismaService from './database/prisma.service';
import { IUsersRepository } from './modules/users/interfaces/user-repository.interface';
import { IUsersController } from './modules/users/interfaces/users.controller.interface';
import { IUsersService } from './modules/users/interfaces/users.service.interface';
import UsersController from './modules/users/users.controller';
import UsersRepository from './modules/users/users.repository';
import UsersService from './modules/users/users.service';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter)
    .to(ExceptionFilter)
    .inSingletonScope();
  bind<IUsersController>(TYPES.UsersController)
    .to(UsersController)
    .inSingletonScope();
  bind<IUsersService>(TYPES.UsersService).to(UsersService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IUsersRepository>(TYPES.UsersRepository)
    .to(UsersRepository)
    .inSingletonScope();
  bind<App>(TYPES.Application).to(App).inSingletonScope();
});

async function bootstrap(): Promise<void> {
  const appContainer = new Container();

  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);

  await app.init();
}

bootstrap();
