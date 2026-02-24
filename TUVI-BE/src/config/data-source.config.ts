import { DataSource } from 'typeorm';
import { env } from './env.config';

// Export a DataSource instance for CLI use
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USER,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.DATABASE,
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  timezone: env.DATABASE.TZ,
  entities: ['dist/database/entities/*.entity.js'],
});
