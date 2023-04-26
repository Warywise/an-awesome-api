"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../prisma"));
class CategoryService {
    constructor() {
        this.prisma = prisma_1.default;
    }
    async getAllCategories() {
        return await this.prisma.category.findMany();
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=category.service.js.map