export interface ITypeOrmConfig {
  readonly type: 'postgres';
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}
