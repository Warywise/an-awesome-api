"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const enumStatusCodes_1 = __importDefault(require("../utils/enumStatusCodes"));
const verifier_1 = __importDefault(require("./verifier"));
class Getter extends verifier_1.default {
    constructor() {
        super();
        this.prisma = prisma_1.default;
    }
    async getUser(email) {
        const getUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!getUser)
            return {
                code: enumStatusCodes_1.default.NOT_FOUND,
                error: 'Invalid email or password',
            };
        return getUser;
    }
}
exports.default = Getter;
//# sourceMappingURL=getter.js.map