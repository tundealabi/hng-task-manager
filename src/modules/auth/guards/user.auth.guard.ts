import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../enums';

@Injectable()
export class UserAuthJwtAuthGuard extends AuthGuard(AuthStrategy.USER) {}
