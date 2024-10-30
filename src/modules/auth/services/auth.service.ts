import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { JWTUser } from '../entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // -------------------------------------------------------
  // CREATE AUTH ACCESS TOKEN
  // -------------------------------------------------------

  async createAccessToken(payload: JWTUser) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow<string>(
        'auth.accessToken.expiresIn',
      ),
      secret: this.configService.getOrThrow<string>('auth.accessToken.secret'),
    });
  }

  // -------------------------------------------------------
  // HASH PASSWORD
  // -------------------------------------------------------

  async hashPassword(password: string) {
    return argon2.hash(password);
  }

  // -------------------------------------------------------
  // COMPARE PASSWORD WITH HASHED PASSWORD
  // -------------------------------------------------------

  async passwordIsMatch(password: string, hashedPassword: string) {
    return argon2.verify(hashedPassword, password);
  }
}
