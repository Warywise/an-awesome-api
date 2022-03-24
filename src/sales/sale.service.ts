import { PrismaClient } from '@prisma/client';

import Getter from '../superClass/getter';
import { UserType } from '../interfaces/users';
import { SaleData } from '../interfaces/sales';

class SaleService extends Getter {

  constructor() {
    super();
  }

  async validateUser(email: string, token: string) {
    const user = await this.getUser(email);
    if ('error' in user) return user;

    const isTokenInvalid = await this.userVerifier(user as UserType, token);
    return isTokenInvalid ?? user;
  }

  async createUserPurchase(email: string, purchaseData: SaleData, token: string) {
    const user = await this.validateUser(email, token);
    if ('error' in user) return user;

    const { payMethodId, productsSold } = purchaseData;

    const payloadSale = { payMethodId, userId: user.id };

    const { id: saleId } = await this.prisma.sale.create({
      data: payloadSale,
    });

    const payloadProduct = productsSold.map((productId) => ({ saleId, productId }));

    try {
      await this.prisma.productSold.createMany({
        data: payloadProduct,
      });
    } catch (err) {
      await this.prisma.sale.delete({
        where: { id: saleId }
      });
    }
  }
}

export default new SaleService();
