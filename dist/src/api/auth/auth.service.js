"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
require("dotenv/config");
const getter_1 = __importDefault(require("../../superClass/getter"));
const enumStatusCodes_1 = __importDefault(require("../../utils/enumStatusCodes"));
class AuthService extends getter_1.default {
    constructor() {
        super();
        this.secret = process.env.SECRET;
    }
    async login(email, hash) {
        const user = await this.getUser(email);
        if ('error' in user)
            return user;
        const userAuth = await argon2_1.default.verify(user.hash, hash);
        if (!userAuth)
            return {
                code: enumStatusCodes_1.default.UNAUTHORIZED_USER,
                error: 'Invalid email or password',
            };
        const { name, lastName, active } = user;
        if (active) {
            const tokenObj = { tkId: (0, uuid_1.v4)(), email };
            const token = jsonwebtoken_1.default.sign(tokenObj, this.secret);
            const hashToken = await argon2_1.default.hash(token);
            await this.prisma.user.update({
                where: { email },
                data: { token: hashToken },
            });
            return {
                email,
                name: name ? `${name} ${lastName}` : null,
                token,
            };
        }
        return {
            code: enumStatusCodes_1.default.UNAUTHORIZED_USER, error: 'Inactive user'
        };
    }
    async logout(email, token) {
        const user = await this.getUser(email);
        if ('error' in user)
            return user;
        const userAuth = await argon2_1.default.verify(user.token, token);
        if (!userAuth)
            return {
                code: enumStatusCodes_1.default.UNAUTHORIZED_USER,
                error: 'Acess Denied',
            };
        await this.prisma.user.update({
            where: { email },
            data: { token: null },
        });
    }
    async refreshToken(email, currentToken) {
        const user = await this.getUser(email);
        if ('error' in user)
            return user;
        const userAuth = await argon2_1.default.verify(user.token, currentToken);
        if (!userAuth)
            return {
                code: enumStatusCodes_1.default.UNAUTHORIZED_USER,
                error: 'Acess Denied',
            };
        const { name, lastName, active } = user;
        const tokenObj = { tkId: (0, uuid_1.v4)(), email };
        const token = jsonwebtoken_1.default.sign(tokenObj, this.secret);
        const hashToken = await argon2_1.default.hash(token);
        await this.prisma.user.update({
            where: { email },
            data: { token: hashToken },
        });
        return {
            email,
            name: name ? `${name} ${lastName}` : null,
            token,
            active,
        };
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map