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
  UsersController: Symbol.for('UsersController'),
  IUsersService: Symbol.for('UsersService'),
  IUsersRepository: Symbol.for('IUsersRepository'),
};

const TYPES = {
  Application: Symbol.for('Application'),
  ...INFRASTRUCTURE,
  ...HOOKS,
  ...DOMAIN,
};

export default TYPES;
