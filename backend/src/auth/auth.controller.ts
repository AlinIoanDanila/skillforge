import { AuthService } from '@/auth/auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authService.authenticate(body);
    // throw new NotImplementedException('Method not implemented');
  }
}
