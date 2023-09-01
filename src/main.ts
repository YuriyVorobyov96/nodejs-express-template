import App from './app';
import ExceptionFilter from './common/filters/exeption.filter';
import LoggerService from './common/logger/logger.sevice';
import UsersController from './modules/users/users.controller';

async function bootstrap() {
  const logger = new LoggerService();

  const app = new App(
    logger,
    new UsersController(logger),
    new ExceptionFilter(logger),
  );

  await app.init();
}

bootstrap();
