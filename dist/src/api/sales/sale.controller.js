"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@decorators/express");
const handler_1 = __importDefault(require("../../superClass/handler"));
const sale_service_1 = __importDefault(require("./sale.service"));
const middlewares_1 = require("../../middlewares");
const enumStatusCodes_1 = __importDefault(require("../../utils/enumStatusCodes"));
let SaleController = class SaleController extends handler_1.default {
    async createSale(req, res) {
        const { body, headers: { authorization: token }, params: { email } } = req;
        const saleResult = await this
            .TryCatch(() => sale_service_1.default.createUserPurchase(email, body, token));
        if (saleResult && 'error' in saleResult) {
            const { code, error } = saleResult;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.CREATED).json(saleResult);
    }
};
__decorate([
    (0, express_1.Post)('/:email', [middlewares_1.VerifyToken, middlewares_1.VerifyEmail, middlewares_1.VerifySale]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "createSale", null);
SaleController = __decorate([
    (0, express_1.Controller)('/sales')
], SaleController);
exports.default = SaleController;
//# sourceMappingURL=sale.controller.js.map