"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyCardData = exports.VerifyAdressData = exports.VerifyUserData = exports.VerifyHash = exports.VerifyEmail = exports.VerifyBodyEmail = void 0;
const enumStatusCodes_1 = __importDefault(require("../utils/enumStatusCodes"));
const users_1 = require("./joiObjects/users");
class VerifyBodyEmail {
    use(req, res, next) {
        const email = req.body;
        const { error: err } = users_1.joiEmail.validate(email);
        if (err)
            return res.status(enumStatusCodes_1.default.BAD_REQUEST).json({ error: err.message });
        next();
    }
}
exports.VerifyBodyEmail = VerifyBodyEmail;
class VerifyEmail {
    use(req, res, next) {
        const email = req.headers.email || req.params.email;
        const { error: err } = users_1.joiEmail.validate({ email });
        if (err)
            return res.status(enumStatusCodes_1.default.BAD_REQUEST).json({ error: err.message });
        next();
    }
}
exports.VerifyEmail = VerifyEmail;
class VerifyHash {
    use(req, res, next) {
        const hash = req.body;
        const { error: err } = users_1.joiHash.validate(hash);
        if (err)
            return res.status(enumStatusCodes_1.default.BAD_REQUEST).json({ error: err.message });
        next();
    }
}
exports.VerifyHash = VerifyHash;
class VerifyUserData {
    use(req, res, next) {
        const userData = req.body;
        const { error: err } = users_1.joiUserData.validate(userData);
        if (err)
            return res.status(enumStatusCodes_1.default.BAD_REQUEST).json({ error: err.message });
        next();
    }
}
exports.VerifyUserData = VerifyUserData;
class VerifyAdressData {
    use(req, res, next) {
        const userAdress = req.body;
        const { error: err } = users_1.joiAdress.validate(userAdress);
        if (err)
            return res.status(enumStatusCodes_1.default.BAD_REQUEST).json({ error: err.message });
        next();
    }
}
exports.VerifyAdressData = VerifyAdressData;
class VerifyCardData {
    use(req, res, next) {
        const userCard = req.body;
        const { error: err } = users_1.joiCard.validate(userCard);
        if (err)
            return res.status(enumStatusCodes_1.default.BAD_REQUEST).json({ error: err.message });
        next();
    }
}
exports.VerifyCardData = VerifyCardData;
//# sourceMappingURL=userMiddlewares.js.map