/* eslint-disable no-underscore-dangle */
import { Response, Router } from 'express';

import { IRoute } from '../interfaces/route.interface';
import LoggerService from '../logger/logger.sevice';

export { Router } from 'express';

export default abstract class AController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  public get router(): Router {
    return this._router;
  }

  public send<T>(
    res: Response,
    code: number,
    message: T,
  ): Response<unknown, Record<string, unknown>> {
    res.type('application/json');

    return res.status(code).json(message);
  }

  public ok<T>(
    res: Response,
    message: T,
  ): Response<unknown, Record<string, unknown>> {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): Response<unknown, Record<string, unknown>> {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IRoute[]): void {
    routes.forEach((route) => {
      const handler = route.func.bind(this);

      this.router[route.method](route.path, handler);

      this.logger.log(`[${route.method}] ${route.path}`);
    });
  }
}
