import { PrismaClient, User } from '@prisma/client';

import UserVerifier from '../userVerifier';
import { UserType } from '../../interfaces/users';

class UserInfos extends UserVerifier {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  private async validateUser(email: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        token: true,
      }
    });

    const userAuth = await this.userVerifier(user as UserType, token);

    return userAuth ?? user as User;
  }
}

export default new UserInfos();