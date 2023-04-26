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
const handler_1 = __importDefault(require("../../../superClass/handler"));
const userInfos_service_1 = __importDefault(require("./userInfos.service"));
const middlewares_1 = require("../../../middlewares");
const enumStatusCodes_1 = __importDefault(require("../../../utils/enumStatusCodes"));
let UserInfosController = class UserInfosController extends handler_1.default {
    async createAdress(req, res) {
        const { body: adress, headers: { authorization: token }, params: { email } } = req;
        const userAdress = await this
            .TryCatch(() => userInfos_service_1.default.createUserAdress(email, adress, token));
        if (userAdress && 'error' in userAdress) {
            const { code, error } = userAdress;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.CREATED).json(userAdress);
    }
    async createCard(req, res) {
        const { body: card, headers: { authorization: token }, params: { email } } = req;
        const userCard = await this
            .TryCatch(() => userInfos_service_1.default.createUserCard(email, card, token));
        if (userCard && 'error' in userCard) {
            const { code, error } = userCard;
            return res.status(code).json({ error });
        }
        return res.status(enumStatusCodes_1.default.CREATED).json(userCard);
    }
};
__decorate([
    (0, express_1.Post)('/adress/:email', [middlewares_1.VerifyToken, middlewares_1.VerifyEmail, middlewares_1.VerifyAdressData]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserInfosController.prototype, "createAdress", null);
__decorate([
    (0, express_1.Post)('/card/:email', [middlewares_1.VerifyToken, middlewares_1.VerifyEmail, middlewares_1.VerifyCardData]),
    __param(0, (0, express_1.Request)()),
    __param(1, (0, express_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserInfosController.prototype, "createCard", null);
UserInfosController = __decorate([
    (0, express_1.Controller)('/users')
], UserInfosController);
exports.default = UserInfosController;
//# sourceMappingURL=userInfos.controller.js.map