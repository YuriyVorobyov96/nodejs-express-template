import { ContainerModule, interfaces } from 'inversify';

import TYPES from '../dependency-injection/types';
import { IHook } from '../interfaces/hook.interface';
import { IModule } from '../interfaces/module.interface';
import UseExceptionFilters from './use-exception-filters.hook';
import UseMiddlewares from './use-middlewares.hook';
import UseRoutes from './use-routes.hook';

export default class HooksModule implements IModule {
  public init(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<IHook>(TYPES.UseRoutes).to(UseRoutes).inSingletonScope();
      bind<IHook>(TYPES.UseExceptionFilters)
        .to(UseExceptionFilters)
        .inSingletonScope();
      bind<IHook>(TYPES.UseMiddlewares).to(UseMiddlewares).inSingletonScope();
    });
  }
}
