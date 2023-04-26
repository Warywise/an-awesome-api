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
const product_service_1 = __importDefault(require("./product.service"));
const enumStatusCodes_1 = __importDefault(require("../../utils/enumStatusCodes"));
const joiMiddleware_1 = require("../../middlewares/joiMiddleware");
const products_1 = require("../../middlewares/joiObjects/products");
let ProductController = class ProductController extends handler_1.default {
    constructor() {
        super();
    }
    async getProducts(req, res) {
        const result = await this
            .TryCatch(() => product_service_1.default.getProducts(req));
        if (result === null || result === void 0 ? void 0 : result.error) {
            const { code, error } = result;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.OK).json(result);
    }
    async getProductById(req, res) {
        const { id } = req.params;
        const product = await this
            .TryCatch(() => product_service_1.default.getProductById(Number(id)));
        if (product && 'error' in product) {
            const { code, error } = product;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.OK).json(product);
    }
};
__decorate([
    (0, express_1.Get)('/query', [(req, res, next) => (0, joiMiddleware_1.joiValidator)(req, res, next, 'query', products_1.joiProducts)]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, express_1.Get)('/:id'),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
ProductController = __decorate([
    (0, express_1.Controller)('/products'),
    __metadata("design:paramtypes", [])
], ProductController);
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map