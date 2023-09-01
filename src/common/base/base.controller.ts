/* eslint-disable no-underscore-dangle */
import { Router } from 'express';

import { IRoute } from '../interfaces/route.interface';
import LoggerService from '../logger/logger.sevice';

export { Router } from 'express';

export default abstract class ABaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  public get router(): Router {
    return this._router;
  }

  protected bindRoutes(routes: IRoute[]): void {
    routes.forEach((route) => {
      const handler = route.func.bind(this);

      this.router[route.method](route.path, handler);

      this.logger.log(`[${route.method}] ${route.path}`);
    });
  }
}
