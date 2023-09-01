import { Container } from 'inversify';

import App from './app';
import AppModule from './app.module';
import TYPES from './common/dependency-injection/types';
import HooksModule from './common/hooks/hooks.module';
import UsersModule from './modules/users/users.module';

async function bootstrap(): Promise<void> {
  const appContainer = new Container();

  appContainer.load(
    new AppModule().init(),
    new HooksModule().init(),
    new UsersModule().init(),
  );

  const app = appContainer.get<App>(TYPES.Application);

  await app.init();
}

bootstrap();
