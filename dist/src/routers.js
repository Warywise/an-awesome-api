"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("@decorators/express");
const category_controller_1 = __importDefault(require("./api/categories/category.controller"));
const product_controller_1 = __importDefault(require("./api//products/product.controller"));
const user_controler_1 = __importDefault(require("./api//users/user.controler"));
const userInfos_controller_1 = __importDefault(require("./api//users/userInfos/userInfos.controller"));
const auth_controller_1 = __importDefault(require("./api/auth/auth.controller"));
const sale_controller_1 = __importDefault(require("./api//sales/sale.controller"));
const router = express_1.default.Router();
(0, express_2.attachControllers)(router, [
    category_controller_1.default,
    product_controller_1.default,
    user_controler_1.default,
    userInfos_controller_1.default,
    auth_controller_1.default,
    sale_controller_1.default,
]);
exports.default = router;
//# sourceMappingURL=routers.js.map