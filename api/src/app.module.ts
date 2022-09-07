import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormAsyncConfig } from './configs/orm.config';
import { rateLimitConfig } from './configs/rate-limit.config';
import { MoviesModule } from './modules/movies/movies.module';
@Module({
  imports: [
    ThrottlerModule.forRoot(rateLimitConfig),
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV !== 'development',
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRootAsync(ormAsyncConfig),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule {}
