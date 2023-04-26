"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../prisma"));
const argon2_1 = __importDefault(require("argon2"));
const enumStatusCodes_1 = __importDefault(require("../../utils/enumStatusCodes"));
const verifier_1 = __importDefault(require("../../superClass/verifier"));
class UserService extends verifier_1.default {
    constructor() {
        super();
        this.prisma = prisma_1.default;
    }
    async getUserByEmail(email, token) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                token: true,
                cpf: true,
                active: true,
            }
        });
        const userAuth = await this.userVerifier(user, token);
        if (userAuth)
            return userAuth;
        const { id, email: userEmai, name, lastName, cpf, active } = user;
        return {
            id,
            email: userEmai,
            name: `${name} ${lastName}`,
            cpf,
            active
        };
    }
    async getUserInfosByEmail(email, token) {
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
        if (!userInfos)
            return {
                code: enumStatusCodes_1.default.NOT_FOUND,
                error: 'User not found'
            };
        const userAuth = await this.userVerifier(userInfos, token);
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
        return userAuth !== null && userAuth !== void 0 ? userAuth : processUserInfos;
    }
    async verifyUserCondition(email) {
        const userResult = await this.prisma.user.findUnique({
            where: { email },
            select: {
                email: true,
                active: true,
            }
        });
        const userVerify = await this.userVerifier(userResult);
        return userVerify !== null && userVerify !== void 0 ? userVerify : userResult;
    }
    async createOrUpdateUser(newUserData) {
        if (!newUserData.hash) {
            return {
                code: enumStatusCodes_1.default.BAD_REQUEST,
                error: '"hash" is required'
            };
        }
        newUserData.hash = await argon2_1.default.hash(newUserData.hash);
        const newData = Object.assign(Object.assign({}, newUserData), { active: true });
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
    async updateUser(userData, token) {
        const user = await this.prisma.user.findUnique({
            where: { email: userData.email },
            select: {
                hash: true,
                token: true,
            }
        });
        if (userData.hash) {
            const userAuth = await argon2_1.default.verify(user.hash, userData.hash);
            if (userAuth) {
                userData.hash = await argon2_1.default.hash(userData.hash);
            }
            else {
                return {
                    code: enumStatusCodes_1.default.UNAUTHORIZED_USER,
                    error: 'Access denied'
                };
            }
        }
        const missingAuth = await this.userVerifier(user, token);
        if (missingAuth)
            return missingAuth;
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
    async disableUser(email, hash, token) {
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
        const userAuth = await this.userVerifier(user, token);
        if (userAuth)
            return userAuth;
        const hashAuth = await argon2_1.default.verify(user === null || user === void 0 ? void 0 : user.hash, hash);
        if (hashAuth) {
            await this.prisma.userAdress.deleteMany({
                where: { userId: user === null || user === void 0 ? void 0 : user.id }
            });
            await this.prisma.userCard.deleteMany({
                where: { userId: user === null || user === void 0 ? void 0 : user.id }
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
            code: enumStatusCodes_1.default.UNAUTHORIZED_USER,
            error: 'Access denied'
        };
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map