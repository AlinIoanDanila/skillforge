import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { UsersService } from '@/users/users.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

import {
  CreateUserSchema,
  type CreateUserDto,
} from '@myproject/api-types/users';

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
  login(@Body() body: { username: string; password: string }) {
    return this.authService.authenticate(body);
  }
}
