const TYPES = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  UsersController: Symbol.for('UsersController'),
  UsersService: Symbol.for('UsersService'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  ConfigService: Symbol.for('ConfigService'),
  PrismaService: Symbol.for('PrismaService'),
  UsersRepository: Symbol.for('UsersRepository'),
  UseRoutes: Symbol.for('UseRoutes'),
  UseMiddlewares: Symbol.for('UseMiddlewares'),
  UseExceptionFilters: Symbol.for('UseExceptionFilters'),
};

export default TYPES;
