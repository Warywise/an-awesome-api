"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const enumStatusCodes_1 = __importDefault(require("../utils/enumStatusCodes"));
class VerifyToken {
    use(req, res, next) {
        const { authorization: token } = req.headers;
        if (!token || typeof token !== 'string') {
            return res.status(enumStatusCodes_1.default.UNAUTHORIZED_USER).json({ error: 'Missing authorization token' });
        }
        next();
    }
}
exports.VerifyToken = VerifyToken;
//# sourceMappingURL=tokenMiddlewares.js.map