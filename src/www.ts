import { TPort } from './common/types/port.type';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default class WWW {
  public port: TPort;

  public static normalizePort(val: unknown): TPort {
    const port = Number(val);

    if (Number.isNaN(port) && typeof val === 'string') {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    throw new Error('Provide correct port value');
  }
}
