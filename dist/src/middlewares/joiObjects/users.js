"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiCard = exports.joiAdress = exports.joiUserData = exports.joiHash = exports.joiEmail = void 0;
const joi_1 = __importDefault(require("joi"));
exports.joiEmail = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.joiHash = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    hash: joi_1.default.string().min(6).required(),
});
exports.joiUserData = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    hash: joi_1.default.string().min(6),
    name: joi_1.default.string().min(2).required(),
    lastName: joi_1.default.string().min(2).required(),
    cpf: joi_1.default.string().regex(/^(\d{3}\.){2}\d{3}-\d{2}$/),
});
exports.joiAdress = joi_1.default.object({
    adress: joi_1.default.string().min(7).required(),
    city: joi_1.default.string().min(3).required(),
    district: joi_1.default.string().min(3).required(),
    state: joi_1.default.string().min(2).required(),
});
exports.joiCard = joi_1.default.object({
    cardNumber: joi_1.default.string().min(16).required(),
    cardName: joi_1.default.string().min(6).required(),
    cardValidity: joi_1.default.string().regex(/^\d{2}\/\d{2}$/).required(),
    cpf: joi_1.default.string().regex(/^(\d{3}\.){2}\d{3}-\d{2}$/).required(),
});
//# sourceMappingURL=users.js.map