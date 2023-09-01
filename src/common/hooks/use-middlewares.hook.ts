import { Express, json } from 'express';
import { inject, injectable } from 'inversify';

import { IConfigService } from '../../config/interfaces/config.service.interface';
import TYPES from '../dependency-injection/types';
import { IHook } from '../interfaces/hook.interface';
import AuthMiddleware from '../middlewares/auth.middleware';

@injectable()
export default class UseMiddlewares implements IHook {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {}

  public execute(app: Express): void {
    const authMiddleware = new AuthMiddleware(
      this.configService.get('JWT_SECRET'),
    );

    app.use(json());
    app.use(authMiddleware.execute.bind(authMiddleware));
  }
}
