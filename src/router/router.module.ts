import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { RoutesAuthModule } from './routes';

@Module({
  imports: [
    NestRouterModule.register([{ path: 'users', module: RoutesAuthModule }]),
    RoutesAuthModule,
  ],
})
export class RouterModule {}
