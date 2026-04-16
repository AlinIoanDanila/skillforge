import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@/users/users.service';

type AuthInput = {
  username: string;
  password: string;
};

type SignInData = {
  userId: string;
  username: string;
};

type AuthResult = {
  accessToken: string;
  userId: string;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user)
      throw new UnauthorizedException('Incorrect username or password');

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByName(input.username);

    if (!user)
      throw new UnauthorizedException('Incorrect username or password');

    if (!user.hashedPassword) return null;

    const isPasswordCorrect = await bcrypt.compare(
      input.password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Incorrect username or password');

    return {
      userId: user.id,
      username: user.name,
    };
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      username: user.username,
      userId: user.userId,
      accessToken,
    };
  }
}
