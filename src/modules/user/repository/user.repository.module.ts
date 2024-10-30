import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModel, UserSchema } from './schemas';
import { UserRepository } from './user.repository';

@Module({
  controllers: [],
  exports: [UserRepository],
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  providers: [UserRepository],
})
export class UserRepositoryModule {}
