import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import type * as PrismaType from 'generated/prisma/client';

type User = PrismaType.User;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByName(username: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        name: username,
      },
    });

    if (!user) throw new NotFoundException();

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
    const hashedPassword = await this.hashPassword(password);

    const user = this.prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashedPassword,
        userType: userType,
      },
    });

    return user;
  }
}
