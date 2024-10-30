import { Injectable } from '@nestjs/common';

import { UserCreateDto } from '../dtos';
import { UserProfile } from '../entities';
import { UserModel } from '../repository/schemas';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: UserCreateDto) {
    const createUser: UserModel = new UserModel();

    createUser.email = dto.email;
    createUser.password = dto.password;
    createUser.username = dto.username;

    return this.userRepository.create(createUser);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }
  async findOneById(userId: string) {
    return this.userRepository.findOne({ _id: userId });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ username });
  }

  async isExistingEmail(email: string) {
    return !!(await this.findOneByEmail(email));
  }

  async isExistingUsername(username: string) {
    return !!(await this.findOneByUsername(username));
  }

  formatUser(user: UserModel): UserProfile {
    return {
      email: user.email,
      username: user.username,
    };
  }
}
