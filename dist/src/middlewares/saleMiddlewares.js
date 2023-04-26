"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifySale = void 0;
const sales_1 = require("./joiObjects/sales");
const enumStatusCodes_1 = __importDefault(require("../utils/enumStatusCodes"));
class VerifySale {
    use(req, res, next) {
        const saleData = req.body;
        const { error: err } = sales_1.joiSale.validate(saleData);
        if (err)
            return res.status(enumStatusCodes_1.default.BAD_REQUEST).json({ error: err.message });
        next();
    }
}
exports.VerifySale = VerifySale;
//# sourceMappingURL=saleMiddlewares.js.map