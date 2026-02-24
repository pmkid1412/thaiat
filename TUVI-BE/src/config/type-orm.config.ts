import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from './env.config';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USER,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.DATABASE,
  autoLoadEntities: true,
  synchronize: false,
  timezone: env.DATABASE.TZ,
  entities: ['dist/database/entities/*.entity.js'],
};

export default config;
