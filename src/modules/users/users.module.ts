import { ContainerModule, interfaces } from 'inversify';

import TYPES from '../../common/dependency-injection/types';
import { IModule } from '../../common/interfaces/module.interface';
import { IUsersRepository } from './interfaces/user-repository.interface';
import { IUsersController } from './interfaces/users.controller.interface';
import { IUsersService } from './interfaces/users.service.interface';
import UsersController from './users.controller';
import UsersRepository from './users.repository';
import UsersService from './users.service';

export default class UsersModule implements IModule {
  public init(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<IUsersController>(TYPES.IUsersController)
        .to(UsersController)
        .inSingletonScope();
      bind<IUsersService>(TYPES.IUsersService)
        .to(UsersService)
        .inSingletonScope();
      bind<IUsersRepository>(TYPES.IUsersRepository)
        .to(UsersRepository)
        .inSingletonScope();
    });
  }
}
