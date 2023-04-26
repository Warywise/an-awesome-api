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
const auth_service_1 = __importDefault(require("./auth.service"));
const middlewares_1 = require("../../middlewares");
const enumStatusCodes_1 = __importDefault(require("../../utils/enumStatusCodes"));
let AuthController = class AuthController extends handler_1.default {
    async login(req, res) {
        const { email, hash } = req.body;
        const userLogin = await this
            .TryCatch(() => auth_service_1.default.login(email, hash));
        if (userLogin && 'error' in userLogin) {
            const { code, error } = userLogin;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.OK).json(userLogin);
    }
    async logout(req, res) {
        const { body: { email }, headers: { authorization: token } } = req;
        const userLogout = await this
            .TryCatch(() => auth_service_1.default.logout(email, token));
        if (userLogout) {
            const { code, error } = userLogout;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.NO_CONTENT).end();
    }
    async refreshToken(req, res) {
        const { body: { email }, headers: { authorization: token } } = req;
        const userRefreshToken = await this
            .TryCatch(() => auth_service_1.default.refreshToken(email, token));
        if (userRefreshToken && 'error' in userRefreshToken) {
            const { code, error } = userRefreshToken;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.OK).json(userRefreshToken);
    }
};
__decorate([
    (0, express_1.Post)('/login', [middlewares_1.VerifyHash]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, express_1.Post)('/logout', [middlewares_1.VerifyToken, middlewares_1.VerifyBodyEmail]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, express_1.Post)('/refresh', [middlewares_1.VerifyToken, middlewares_1.VerifyBodyEmail]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    (0, express_1.Controller)('/auth')
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map