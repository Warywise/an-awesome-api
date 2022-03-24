import { PrismaClient, User } from '@prisma/client';
import StatusCode from '../utils/enumStatusCodes';
import Verifier from './verifier';

export default abstract class Getter extends Verifier {
  protected prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  protected async getUser(email: string) {
    const getUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!getUser) return {
      code: StatusCode.NOT_FOUND,
      error: 'Invalid email or password',
    };
    return getUser as User;
  }
}
