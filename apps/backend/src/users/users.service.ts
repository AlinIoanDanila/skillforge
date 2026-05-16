import * as bcrypt from 'bcrypt';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { isPrismaErrorCode } from '@/prisma/prisma-error';
import type * as PrismaType from 'generated/prisma/client';

type User = PrismaType.User;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) throw new UnauthorizedException('Incorrect email or password');

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    userType: PrismaType.UserType = 'User',
  ): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(password);

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
          userType,
        },
      });

      return user;
    } catch (error: unknown) {
      if (isPrismaErrorCode(error, 'P2002')) {
        throw new ConflictException('User with this email already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
