import { PrismaClient } from '@prisma/client';
import argon from 'argon2';
import { NewUser } from '../interfaces/users';
import StatusCode from '../utils/enumStatusCodes';

type userToken = { email: string, token?: string };

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private async userVerifier(user: userToken | null, token: string | null = null) {
    if (!user) return {
      code: StatusCode.NOT_FOUND,
      error: 'User not found'
    };

    const userAuth = token
      ? await argon.verify(user.token as string, token)
      : true;

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

  async verifyUserCondition(email: string) {
    const userResult = await this.prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        active: true,
      }
    });

    const userVerify = await this.userVerifier(userResult as userToken);

    return userVerify ?? userResult;
  }

  async createUser(newUserData: NewUser) {
    newUserData.hash = await argon.hash(newUserData.hash);

    const newUser = await this.prisma.user.create({
      data: newUserData,
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        token: true,
        active: true,
      }
    });

    return newUser;
  }

  async updateUser(userData: NewUser) {
    if (userData.hash) userData.hash = await argon.hash(userData.hash);

    const newData = await this.prisma.user.update({
      where: { email: userData.email },
      data: userData,
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        token: true,
        active: true,
      }
    });

    return newData;
  }

  async disableUser(email: string, hash: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        hash: true,
        token: true,
        active: true,
      }
    });

    const userAuth = await this.userVerifier(user as userToken, token);

    if (userAuth) return userAuth;

    const hashAuth = await argon.verify(user?.hash as string, hash);

    if (hashAuth) {
      await this.prisma.userAdress.deleteMany({
        where: { userId: user?.id }
      });

      await this.prisma.userCard.deleteMany({
        where: { userId: user?.id }
      });

      return await this.prisma.user.update({
        where: { email },
        data: { active: false },
        select: {
          email: true,
          active: true,
        }
      });
    }

    return {
      code: StatusCode.UNAUTHORIZED_USER,
      error: 'Access denied'
    };
  }
}
