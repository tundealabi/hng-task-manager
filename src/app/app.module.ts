import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@/common/common.module';
import { HttpExceptionFilter } from '@/common/filters';
import {
  HttpLoggerMiddleware,
  TrimRequestBodyMiddleware,
} from '@/common/middlewares';
import { DatabaseModule } from '@/database/database.module';
import { RouterModule } from '@/router/router.module';

@Module({
  imports: [CommonModule, DatabaseModule, RouterModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware, TrimRequestBodyMiddleware)
      .forRoutes('*');
  }
}
