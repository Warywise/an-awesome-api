import { PrismaClient, User } from '@prisma/client';
import argon from 'argon2';
import { NewUser, UserType } from '../interfaces/users';
import StatusCode from '../utils/enumStatusCodes';
import Verifier from '../superClass/verifier';

class UserService extends Verifier {
  private prisma: PrismaClient;

  constructor() {
    super();
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
        cpf: true,
        token: true,
        active: true,
      }
    });

    const userAuth = await this.userVerifier(user as UserType, token);

    return userAuth ?? user as User;
  }

  async getUserInfosByEmail(email: string, token: string) {
    const userInfos = await this.prisma.user.findUnique({
      where: { email },
      select: {
        cpf: true,
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

    const userAuth = await this.userVerifier(userInfos as UserType, token);

    const processUserInfos = {
      cpf: userInfos.cpf,
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

    const userVerify = await this.userVerifier(userResult as UserType);

    return userVerify ?? userResult as User;
  }

  async createOrUpdateUser(newUserData: NewUser) {
    if (!newUserData.hash) {
      return {
        code: StatusCode.BAD_REQUEST,
        error: '"hash" is required'
      };
    }

    newUserData.hash = await argon.hash(newUserData.hash);
    const newData = { ...newUserData, active: true };

    const newUser = await this.prisma.user.upsert({
      where: { email: newData.email },
      create: newData,
      update: newData,
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

  async updateUser(userData: NewUser, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
      select: {
        hash: true,
        token: true,
      }
    }) as UserType;

    if (userData.hash) {
      const userAuth = await argon.verify(user.hash as string, userData.hash);

      if (userAuth) {
        userData.hash = await argon.hash(userData.hash);
      } else {
        return {
          code: StatusCode.UNAUTHORIZED_USER,
          error: 'Access denied'
        };
      }
    }

    const missingAuth = await this.userVerifier(user, token);

    if (missingAuth) return missingAuth;

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

    const userAuth = await this.userVerifier(user as UserType, token);

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

export default new UserService();
