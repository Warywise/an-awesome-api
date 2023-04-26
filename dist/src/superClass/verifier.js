"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const enumStatusCodes_1 = __importDefault(require("../utils/enumStatusCodes"));
class Verifier {
    async userVerifier(user, token = null) {
        if (!user)
            return {
                code: enumStatusCodes_1.default.NOT_FOUND,
                error: 'User not found'
            };
        const userAuth = token
            ? await argon2_1.default.verify(user.token, token)
            : true;
        return userAuth ? null
            : {
                code: enumStatusCodes_1.default.UNAUTHORIZED_USER,
                error: 'Access denied'
            };
    }
}
exports.default = Verifier;
//# sourceMappingURL=verifier.js.map