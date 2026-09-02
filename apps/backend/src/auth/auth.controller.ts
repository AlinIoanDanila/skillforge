import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from '@/auth/auth.service';
import { UsersService } from '@/users/users.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

import {
  CreateUserSchema,
  LoginSchema,
  type LoginDto,
  type CreateUserDto,
} from '@myproject/api-types/users';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser, type ICurrentUser } from '@/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  createNewUser(
    @Body(new ZodValidationPipe(CreateUserSchema)) dto: CreateUserDto,
  ) {
    const { name, email, password, type } = dto;
    return this.usersService.createUser(name, email, password, type);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body(new ZodValidationPipe(LoginSchema)) dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.authenticate(dto);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15,
      path: '/',
    });

    return { success: true };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async verifyUser(@CurrentUser() user: ICurrentUser) {
    return this.authService.verifyMe(user);
  }
}
