import { PrismaClient } from '@prisma/client';
import argon from 'argon2';
import StatusCode from '../utils/enumStatusCodes';

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserByEmail(email: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        token: true,
        active: true,
      }
    });

    if (!user) return {
      code: StatusCode.NOT_FOUND,
      error: 'User not found'
    };

    const userAuth = await argon.verify(user.token as string, token);

    return userAuth
      ? user
      : { code: StatusCode.UNAUTHORIZED_USER,
          error: 'Access denied' };
  }
}