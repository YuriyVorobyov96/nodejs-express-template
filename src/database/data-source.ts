import config from 'config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ITypeOrmConfig } from './interfaces/typeorm-config.interface';

const TYPEORM_CONFIG: ITypeOrmConfig = config.get('typeorm');

const DATA_SOURCE = new DataSource({
  entities: [`${__dirname}/entities/*{.js,.ts}`],
  migrations: [`${__dirname}/migrations/*{.js,.ts}`],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  ...TYPEORM_CONFIG,
});

export default DATA_SOURCE;
