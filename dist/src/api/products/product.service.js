"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../prisma"));
const enumStatusCodes_1 = __importDefault(require("../../utils/enumStatusCodes"));
class ProductService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async getProducts(request) {
        const _a = request.query, { name, category, hasDiscount } = _a, rest = __rest(_a, ["name", "category", "hasDiscount"]);
        const where = {};
        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive',
            };
        }
        if (category) {
            where.category = {
                name: {
                    contains: category,
                    mode: 'insensitive',
                }
            };
        }
        if (hasDiscount) {
            where.hasDiscount = true;
        }
        let products = [];
        const total = await this.prisma.product.count({ where });
        if (total > 0) {
            products = await this.prisma.product.findMany(Object.assign({ where, include: {
                    category: {
                        select: {
                            name: true,
                        }
                    }
                } }, rest));
        }
        return products.length
            ? { products, total }
            : {
                code: enumStatusCodes_1.default.NOT_FOUND,
                error: 'Products not found',
            };
    }
    async getProductById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true
            },
        });
        return product !== null && product !== void 0 ? product : {
            code: enumStatusCodes_1.default.NOT_FOUND,
            error: 'Product not found'
        };
    }
}
exports.default = new ProductService();
//# sourceMappingURL=product.service.js.map