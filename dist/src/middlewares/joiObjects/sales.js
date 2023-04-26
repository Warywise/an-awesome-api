"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiSale = void 0;
const joi_1 = __importDefault(require("joi"));
exports.joiSale = joi_1.default.object({
    email: joi_1.default.string(),
    payMethodId: joi_1.default.number().required(),
    productsSold: joi_1.default.array().items(joi_1.default.number()).min(1).required(),
});
//# sourceMappingURL=sales.js.map