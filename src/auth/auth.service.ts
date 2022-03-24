import argon from 'argon2';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';

import Getter from '../superClass/getter';
import StatusCode from '../utils/enumStatusCodes';

class AuthService extends Getter {
  private secret: string;

  constructor() {
    super();
    this.secret = process.env.SECRET as string;
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
    const token = jwt.sign(tokenObj, this.secret);
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
      error: 'Acess Denied',
    };
    const { name, lastName, active } = user;

    const tokenObj = { tkId: uuid(), email };
    const token = jwt.sign(tokenObj, this.secret);
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
