import { PrismaClient } from '@prisma/client';
import UserVerifier from '../userVerifier';

class UserInfos extends UserVerifier {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }
}
