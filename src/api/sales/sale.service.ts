import Getter from '../../superClass/getter';
import { UserType } from '../../interfaces/users';
import { SaleData } from '../../interfaces/sales';
import StatusCode from '../../utils/enumStatusCodes';

class SaleService extends Getter {
  constructor() {
    super();
  }

  private async validateUser(email: string, token: string) {
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
      const productsSold = await this.prisma.productSold.createMany({
        data: payloadProduct,
      });

      return productsSold;
    } catch (err) {
      await this.prisma.sale.delete({
        where: { id: saleId }
      });

      return {
        code: StatusCode.INVALID_CONTENT,
        error: 'Internal server error or invalid request content',
      };
    }
  }
}

export default new SaleService();
