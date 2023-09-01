import { AsyncContainerModule, ContainerModule } from 'inversify';

export interface IModule {
  init: () => ContainerModule | AsyncContainerModule;
}
