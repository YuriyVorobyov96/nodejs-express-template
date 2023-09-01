import App from './app';
import LoggerService from './common/logger/logger.sevice';

async function bootstrap() {
  const app = new App(new LoggerService());

  await app.init();
}

bootstrap();
