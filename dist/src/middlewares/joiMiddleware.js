"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiValidator = void 0;
const enumStatusCodes_1 = __importDefault(require("../utils/enumStatusCodes"));
const joiValidator = (req, res, next, key, joiObject) => {
    const { error: err, value } = joiObject.validate(req[key]);
    if (err)
        return res.status(enumStatusCodes_1.default.BAD_REQUEST).json({ error: err.message });
    req[key] = value;
    next();
};
exports.joiValidator = joiValidator;
//# sourceMappingURL=joiMiddleware.js.map