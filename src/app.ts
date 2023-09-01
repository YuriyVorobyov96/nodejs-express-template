import express, { Express } from 'express';
import { Server } from 'http';

export default class App {
  private app: Express;

  private server: Server;

  private port: number;

  constructor() {
    this.app = express();
    this.port = 3000;
  }

  private useMiddleware(): void { }

  private useRoutes(): void { }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();

    this.server = this.app.listen(this.port);
  }
}
