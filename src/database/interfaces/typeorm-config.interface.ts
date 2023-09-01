import { TPostgres } from '../types/postgres.type';

export interface ITypeOrmConfig {
  readonly type: TPostgres;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}
