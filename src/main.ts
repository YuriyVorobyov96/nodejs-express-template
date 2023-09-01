import { Container } from 'inversify';

import App from './app';
import TYPES from './common/dependency-injection/types';
import ExceptionFilter from './common/filters/exeption.filter';
import { ILogger } from './common/interfaces/logger.interface';
import LoggerService from './common/logger/logger.sevice';
import UsersController from './modules/users/users.controller';

async function bootstrap() {
  const appContainer = new Container();

  appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
  appContainer.bind<ExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);
  appContainer.bind<App>(TYPES.Application).to(App);

  const app = appContainer.get<App>(TYPES.Application);

  await app.init();
}

bootstrap();
