import { NextFunction, Request, Response, Router } from 'express';

import { IMiddlware } from './middlware.interface';

export interface IRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete'>;
  middlewares?: IMiddlware[];
}
