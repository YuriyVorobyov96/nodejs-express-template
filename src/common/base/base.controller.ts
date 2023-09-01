/* eslint-disable no-underscore-dangle */
import 'reflect-metadata';

import { Response, Router } from 'express';
import { injectable } from 'inversify';

import { ILogger } from '../interfaces/logger.interface';
import { IRoute } from '../interfaces/route.interface';
import { TResponse } from '../types/response.type';

export { Router } from 'express';

@injectable()
export default abstract class AController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  public get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): TResponse {
    res.type('application/json');

    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): TResponse {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): TResponse {
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
