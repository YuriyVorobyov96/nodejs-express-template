const INFRASTRUCTURE = {
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  ILogger: Symbol.for('ILogger'),
  IDatabaseService: Symbol.for('IDatabaseService'),
};

const HOOKS = {
  UseRoutes: Symbol.for('UseRoutes'),
  UseMiddlewares: Symbol.for('UseMiddlewares'),
  UseExceptionFilters: Symbol.for('UseExceptionFilters'),
};

const DOMAIN = {
  IUsersController: Symbol.for('IUsersController'),
  IUsersService: Symbol.for('IUsersService'),
  IUsersRepository: Symbol.for('IUsersRepository'),
};

const TYPES = {
  Application: Symbol.for('Application'),
  ...INFRASTRUCTURE,
  ...HOOKS,
  ...DOMAIN,
};

export default TYPES;
