"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiProducts = void 0;
const joi_1 = __importDefault(require("joi"));
exports.joiProducts = joi_1.default.object({
    name: joi_1.default.string().min(1),
    category: joi_1.default.string(),
    hasDiscount: joi_1.default.boolean(),
    orderBy: joi_1.default.object({
        name: joi_1.default.string().valid('asc', 'desc'),
        price: joi_1.default.string().valid('asc', 'desc'),
    }),
    skip: joi_1.default.number().min(0),
    take: joi_1.default.number().min(1),
});
//# sourceMappingURL=products.js.map