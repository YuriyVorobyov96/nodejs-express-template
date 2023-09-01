import { NextFunction, Request, Response } from 'express';

import { IController } from '../../../common/interfaces/controller.interface';

export interface IUsersController extends IController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  info: (req: Request, res: Response, next: NextFunction) => void;
}
