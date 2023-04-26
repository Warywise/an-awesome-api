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
const user_service_1 = __importDefault(require("./user.service"));
const middlewares_1 = require("../../middlewares");
const enumStatusCodes_1 = __importDefault(require("../../utils/enumStatusCodes"));
let UserController = class UserController extends handler_1.default {
    async getUser(req, res) {
        const { headers: { authorization, email } } = req;
        const user = await this
            .TryCatch(() => user_service_1.default.getUserByEmail(email, authorization));
        if (user && 'error' in user) {
            const { code, error } = user;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.OK).json(user);
    }
    async getUserInfos(req, res) {
        const { headers: { authorization, email } } = req;
        const userInfos = await this
            .TryCatch(() => user_service_1.default.getUserInfosByEmail(email, authorization));
        if (userInfos && 'error' in userInfos) {
            const { code, error } = userInfos;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.OK).json(userInfos);
    }
    async getUserCondition(req, res) {
        const { email } = req.params;
        const userInfos = await this
            .TryCatch(() => user_service_1.default.verifyUserCondition(email));
        if (userInfos && 'error' in userInfos) {
            const { code, error } = userInfos;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.OK).json(userInfos);
    }
    async upsertUser(req, res) {
        const userData = req.body;
        const userResult = await this
            .TryCatch(() => user_service_1.default.createOrUpdateUser(userData));
        return res.status(enumStatusCodes_1.default.OK).json(userResult);
    }
    async updateUser(req, res) {
        const { body: userData, headers: { authorization: token } } = req;
        const userResult = await this
            .TryCatch(() => user_service_1.default.updateUser(userData, token));
        if (userResult && 'error' in userResult) {
            const { code, error } = userResult;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.OK).json(userResult);
    }
    async disableUser(req, res) {
        const { body: { email, hash }, headers: { authorization: token } } = req;
        const userResult = await this
            .TryCatch(() => user_service_1.default.disableUser(email, hash, token));
        if (userResult && 'error' in userResult) {
            const { code, error } = userResult;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.OK).json(userResult);
    }
};
__decorate([
    (0, express_1.Get)('', [middlewares_1.VerifyToken, middlewares_1.VerifyEmail]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, express_1.Get)('/infos', [middlewares_1.VerifyToken, middlewares_1.VerifyEmail]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfos", null);
__decorate([
    (0, express_1.Get)('/:email', [middlewares_1.VerifyEmail]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserCondition", null);
__decorate([
    (0, express_1.Post)('', [middlewares_1.VerifyUserData]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "upsertUser", null);
__decorate([
    (0, express_1.Put)('', [middlewares_1.VerifyToken, middlewares_1.VerifyUserData]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, express_1.Delete)('', [middlewares_1.VerifyToken, middlewares_1.VerifyHash]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "disableUser", null);
UserController = __decorate([
    (0, express_1.Controller)('/users')
], UserController);
exports.default = UserController;
//# sourceMappingURL=user.controler.js.map