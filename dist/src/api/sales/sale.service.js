"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getter_1 = __importDefault(require("../../superClass/getter"));
const enumStatusCodes_1 = __importDefault(require("../../utils/enumStatusCodes"));
class SaleService extends getter_1.default {
    constructor() {
        super();
    }
    async validateUser(email, token) {
        const user = await this.getUser(email);
        if ('error' in user)
            return user;
        const isTokenInvalid = await this.userVerifier(user, token);
        return isTokenInvalid !== null && isTokenInvalid !== void 0 ? isTokenInvalid : user;
    }
    async createUserPurchase(email, purchaseData, token) {
        const user = await this.validateUser(email, token);
        if ('error' in user)
            return user;
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
        }
        catch (err) {
            await this.prisma.sale.delete({
                where: { id: saleId }
            });
            return {
                code: enumStatusCodes_1.default.INVALID_CONTENT,
                error: 'Internal server error or invalid request content',
            };
        }
    }
}
exports.default = new SaleService();
//# sourceMappingURL=sale.service.js.map