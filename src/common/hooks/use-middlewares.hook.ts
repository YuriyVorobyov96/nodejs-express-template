import config from 'config';
import { Express, json } from 'express';
import { injectable } from 'inversify';

import { IHook } from '../interfaces/hook.interface';
import AuthMiddleware from '../middlewares/auth.middleware';

const JWT_SECRET: string = config.get('jwt.secret');

@injectable()
export default class UseMiddlewares implements IHook {
  public execute(app: Express): void {
    const authMiddleware = new AuthMiddleware(JWT_SECRET);

    app.use(json());
    app.use(authMiddleware.execute.bind(authMiddleware));
  }
}
