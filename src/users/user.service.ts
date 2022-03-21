import { PrismaClient } from '@prisma/client';
import argon from 'argon2';
import StatusCode from '../utils/enumStatusCodes';

type userToken = { token: string };

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private async userVerifier(user: userToken | null, token: string) {
    if (!user) return {
      code: StatusCode.NOT_FOUND,
      error: 'User not found'
    };

    const userAuth = await argon.verify(user.token as string, token);

    return userAuth ? null
      : {
        code: StatusCode.UNAUTHORIZED_USER,
        error: 'Access denied'
      };
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

    const userAuth = await this.userVerifier(user as userToken, token);

    return userAuth ?? user;
  }

  async getUserInfosByEmail(email: string, token: string) {
    const userInfos = await this.prisma.user.findUnique({
      where: { email },
      select: {
        token: true,
        userAdress: true,
        userCard: true,
        purchases: {
          select: {
            payMethod: true,
            createdAt: true,
            productsSold: {
              select: {
                product: true
              }
            }
          }
        }
      }
    });

    if (!userInfos) return {
      code: StatusCode.NOT_FOUND,
      error: 'User not found'
    };

    const userAuth = await this.userVerifier(userInfos as userToken, token);

    const processUserInfos = {
      userAdresses: userInfos.userAdress,
      userCards: userInfos.userCard,
      userPurchases: userInfos.purchases.map((item) => ({
        payMethod: item.payMethod,
        date: item.createdAt,
        products: item.productsSold
      })),
    };

    return userAuth ?? processUserInfos;
  }
}
