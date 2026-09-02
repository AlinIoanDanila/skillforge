import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@/users/users.service';
import { ICurrentUser } from '@/decorators/user.decorator';

type AuthInput = {
  email: string;
  password: string;
};

type SignInData = {
  id: string;
  name: string;
};

type AuthResult = {
  accessToken: string;
  id: string;
  name: string;
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
    const user = await this.usersService.findUserByEmail(input.email);

    if (!user || !user.hashedPassword)
      throw new UnauthorizedException('Incorrect username or password');

    const isPasswordCorrect = await bcrypt.compare(
      input.password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Incorrect username or password');

    return {
      id: user.id,
      name: user.name,
    };
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.id,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      name: user.name,
      id: user.id,
      accessToken,
    };
  }

  async verifyMe(user: ICurrentUser): Promise<ICurrentUser> {
    return { id: user.id, name: user.name };
  }
}
