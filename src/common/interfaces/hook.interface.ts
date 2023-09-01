import { Express } from 'express';

export interface IHook {
  execute: (app: Express) => void;
}
