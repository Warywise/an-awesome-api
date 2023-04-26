"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../../prisma"));
const verifier_1 = __importDefault(require("../../../superClass/verifier"));
class UserInfosService extends verifier_1.default {
    constructor() {
        super();
        this.prisma = prisma_1.default;
    }
    async validateUser(email, token) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                token: true,
            }
        });
        const userAuth = await this.userVerifier(user, token);
        return userAuth !== null && userAuth !== void 0 ? userAuth : user;
    }
    async createUserAdress(email, adress, token) {
        const userAuth = await this.validateUser(email, token);
        if ('error' in userAuth)
            return userAuth;
        const adressData = Object.assign(Object.assign({}, adress), { userId: userAuth.id });
        return await this.prisma.userAdress.create({
            data: adressData,
        });
    }
    async createUserCard(email, card, token) {
        const userAuth = await this.validateUser(email, token);
        if ('error' in userAuth)
            return userAuth;
        const cardData = Object.assign(Object.assign({}, card), { userId: userAuth.id });
        return await this.prisma.userCard.create({
            data: cardData,
        });
    }
}
exports.default = new UserInfosService();
//# sourceMappingURL=userInfos.service.js.map