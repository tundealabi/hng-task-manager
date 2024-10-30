import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, UserModel } from './schemas';
import { EntityRepository } from '@/database/entity.repository';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
