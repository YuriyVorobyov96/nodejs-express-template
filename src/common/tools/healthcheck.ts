import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default function healthcheck(
  req: Request<unknown, unknown, unknown>,
  res: Response,
): void {
  res.sendStatus(StatusCodes.OK);
}
