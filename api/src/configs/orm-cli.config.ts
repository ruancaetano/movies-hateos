import { config } from 'dotenv';
import { resolve } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

if (process.env.NODE_ENV !== 'production') {
  config({ path: resolve(__dirname, '..', '..', '.env.development') });
}

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [resolve(__dirname, '..', 'modules', '**', '*.entity.ts')],
  migrations: [resolve(__dirname, '..', 'db', 'migrations', '*.ts')],
  seeds: [resolve(__dirname, '..', 'db', 'seeds', '*.ts')],
  factories: [resolve(__dirname, '..', 'db', 'factories', '*.ts')],
  cli: {
    migrationsDir: resolve(__dirname, '..', 'db', 'migrations'),
  },
};
