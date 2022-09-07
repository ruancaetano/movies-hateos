import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const ormAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT')),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    namingStrategy: new SnakeNamingStrategy(),
    logging: configService.get('NODE_ENV') === 'development',
    entities: [resolve(__dirname, '..', 'modules', '**', '*.entity{.ts,.js}')],
    migrations: [resolve(__dirname), '..', 'db', 'migrations', '*{.ts,.js}'],
    seeds: [resolve(__dirname), '..', 'db', 'seeds', '*{.ts,.js}'],
    factories: [resolve(__dirname, '..', 'db', 'factories', '*{.ts,.js}')],
  }),
  inject: [ConfigService],
};
