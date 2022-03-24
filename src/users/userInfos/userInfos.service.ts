import { PrismaClient, User } from '@prisma/client';

import Verifier from '../../superClass/verifier';
import { UserAdress, UserCard, UserType } from '../../interfaces/users';

class UserInfosService extends Verifier {
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

  async createUserAdress(email: string, adress: UserAdress, token: string) {
    const userAuth = await this.validateUser(email, token);

    if ('error' in userAuth) return userAuth;

    const adressData = { ...adress, userId: userAuth.id };

    return await this.prisma.userAdress.create({
      data: adressData,
    });
  }

  async createUserCard(email: string, card: UserCard, token: string) {
    const userAuth = await this.validateUser(email, token);

    if ('error' in userAuth) return userAuth;

    const cardData = { ...card, userId: userAuth.id };

    return await this.prisma.userCard.create({
      data: cardData,
    });
  }
}

export default new UserInfosService();
