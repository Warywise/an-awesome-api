import { PrismaClient, User } from '@prisma/client';
import argon from 'argon2';
import jwt from 'jsonwebtoken';
import StatusCode from '../utils/enumStatusCodes';

class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private async getUser(email: string) {
    const getUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!getUser) return {
      code: StatusCode.NOT_FOUND,
      error: 'Invalid email or password',
    };
    return getUser as User;
  }

  async login(email: string, hash: string) {
    const user = await this.getUser(email);

    if ('error' in user) return user;

    const userAuth = await argon.verify(user.hash, hash);

    if (!userAuth) return {
      code: StatusCode.UNAUTHORIZED_USER,
      error: 'Invalid email or password',
    };
    const { id, name, lastName, active } = user;

    const tokenObj = { id, email };
    const token = jwt.sign(tokenObj, '');

    await this.prisma.user.update({
      where: { email },
      data: { token },
    });

    return {
      ...tokenObj,
      name: name ? `${name} ${lastName}` : null,
      token,
      active,
    };
  }
}

export default new AuthService();
