import { Container, ContainerModule, interfaces } from 'inversify';

import App from './app';
import TYPES from './common/dependency-injection/types';
import ExceptionFilter from './common/filters/exeption.filter';
import { ILogger } from './common/interfaces/logger.interface';
import LoggerService from './common/logger/logger.sevice';
import { IUsersController } from './modules/users/interfaces/users.controller.interface';
import { IUsersService } from './modules/users/interfaces/users.service.interface';
import UsersController from './modules/users/users.controller';
import UsersService from './modules/users/users.service';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<ExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUsersController>(TYPES.UsersController).to(UsersController);
  bind<IUsersService>(TYPES.UsersService).to(UsersService);
  bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<void> {
  const appContainer = new Container();

  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);

  await app.init();
}

bootstrap();
