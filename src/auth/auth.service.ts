import { PrismaClient, User } from '@prisma/client';
import argon from 'argon2';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

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
    const { name, lastName, active } = user;

    const tokenObj = { tkId: uuid(), email };
    const token = jwt.sign(tokenObj, '');
    const hashToken = await argon.hash(token);

    await this.prisma.user.update({
      where: { email },
      data: { token: hashToken },
    });

    return {
      email,
      name: name ? `${name} ${lastName}` : null,
      token,
      active,
    };
  }

  async logout(email: string, token: string) {
    const user = await this.getUser(email);

    if ('error' in user) return user;

    const userAuth = await argon.verify(user.token as string, token);

    if (!userAuth) return {
      code: StatusCode.UNAUTHORIZED_USER,
      error: 'Acess Denied',
    };

    await this.prisma.user.update({
      where: { email },
      data: { token: null },
    });
  }

  async refreshToken(email: string, currentToken: string) {
    const user = await this.getUser(email);

    if ('error' in user) return user;

    const userAuth = await argon.verify(user.token as string, currentToken);

    if (!userAuth) return {
      code: StatusCode.UNAUTHORIZED_USER,
      error: 'Invalid email or password',
    };
    const { name, lastName, active } = user;

    const tokenObj = { tkId: uuid(), email };
    const token = jwt.sign(tokenObj, '');
    const hashToken = await argon.hash(token);

    await this.prisma.user.update({
      where: { email },
      data: { token: hashToken },
    });

    return {
      email,
      name: name ? `${name} ${lastName}` : null,
      token,
      active,
    };
  }
}

export default new AuthService();
