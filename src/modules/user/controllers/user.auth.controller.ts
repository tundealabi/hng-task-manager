import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserLoginDto, UserSignupDto } from '../dtos';
import { LoginResponse } from '../entities';
import { UserService } from '../services';
import { ApiResponse } from '@/common/decorators';
import { controllerResponse } from '@/common/helpers';
import { AuthService } from '@/modules/auth/services';

@Controller()
@ApiTags('Auth')
@ApiExtraModels(LoginResponse)
export class UserAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // -------------------------------------------------------
  // USER AUTH CREDENTIAL LOGIN
  // -------------------------------------------------------

  @Post('login')
  @ApiOperation({
    description: 'Usage - Log a user in',
  })
  @ApiResponse(LoginResponse, HttpStatus.OK, {
    description: 'Returns the user data and tokens',
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: UserLoginDto) {
    const errorMessage = 'Email or password is incorrect';
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new ForbiddenException(errorMessage);
    }
    const passwordIsMatch = await this.authService.passwordIsMatch(
      password,
      user.password,
    );
    if (!passwordIsMatch) {
      throw new ForbiddenException(errorMessage);
    }
    const accessToken = await this.authService.createAccessToken({
      sub: user.id,
    });

    return controllerResponse<LoginResponse>({
      data: {
        tokens: { accessToken },
        user: this.userService.formatUser(user),
      },
    });
  }

  // -------------------------------------------------------
  // USER AUTH CREDENTIAL SIGNUP
  // -------------------------------------------------------

  @Post('register')
  @ApiOperation({
    description: 'Usage - Sign a user up',
  })
  @ApiResponse(LoginResponse, HttpStatus.CREATED, {
    description: 'Returns the user data and tokens',
  })
  async signup(
    @Body()
    { email, password, username }: UserSignupDto,
  ) {
    const errorMessage = (entity: 'email' | 'username') =>
      `This ${entity} is already associated with an account`;

    const emailExists = await this.userService.isExistingEmail(email);
    if (emailExists) {
      throw new ConflictException(errorMessage('email'));
    }

    const usernameExists = await this.userService.isExistingUsername(username);
    if (usernameExists) {
      throw new ConflictException(errorMessage('username'));
    }

    const hashedPassword = await this.authService.hashPassword(password);

    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
      username,
    });

    const accessToken = await this.authService.createAccessToken({
      sub: newUser.id,
    });

    return controllerResponse<LoginResponse>({
      data: {
        tokens: { accessToken },
        user: this.userService.formatUser(newUser),
      },
    });
  }
}
