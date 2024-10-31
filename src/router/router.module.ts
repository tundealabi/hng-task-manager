import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { RoutesAuthModule, RoutesTaskModule } from './routes';

@Module({
  imports: [
    NestRouterModule.register([
      { path: 'users', module: RoutesAuthModule },
      { path: 'tasks', module: RoutesTaskModule },
    ]),
    RoutesAuthModule,
    RoutesTaskModule,
  ],
})
export class RouterModule {}
